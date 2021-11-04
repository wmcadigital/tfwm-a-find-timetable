/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from 'react';
import { loadModules } from 'esri-loader';
import { useStopStationContext } from 'globalState';
import mapMarker from 'globalState/helpers/mapMarker';

const useCreateStopsLayer = (view: any) => {
  const [isStopsLayerCreated, setIsStopsLayerCreated] = useState<{
    bus: boolean;
    metro: boolean;
    rail: boolean;
  }>({ bus: false, metro: false, rail: false });
  const map = view !== null && view?.map;

  const [{ stops, selectedModes, location }] = useStopStationContext();

  const createStopsLayer = useCallback(
    async (mode: string) => {
      try {
        if (stops.length === 0) return;
        const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

        const getStopType = (type: string) => {
          switch (type) {
            case 'tram-stop':
              return 'metro';
            case 'rail-station':
              return 'rail';
            default:
              return 'bus';
          }
        };

        const stopGraphics = stops.filter((stop) => getStopType(stop.properties.type) === mode);
        if (stopGraphics.length === 0) {
          return;
        }

        const placeholder = {
          attributes: {
            name: stops[0].properties.name,
            atcoCode: stops[0].properties.atcoCode || '',
            stopType: stops[0].properties.type,
            crs: stops[0].properties.crs || '',
          },
          geometry: {
            type: 'point',
            longitude: location!.location.x,
            latitude: location!.location.y,
            spatialreference: {
              wkid: 4326,
            },
          },
          symbol: {
            type: 'simple-fill',
            style: 'none',
            outline: {
              style: 'none',
            },
          },
        };

        const stopsLayer = new FeatureLayer({
          id: `layer_${mode}`,
          title: 'Nearest bus stops',
          source: [placeholder], // autocast as a Collection of new Graphic()
          objectIdField: 'oid',
          fields: [
            {
              name: 'oid',
              alias: 'ObjectID',
              type: 'oid',
            },
            {
              name: 'name',
              alias: 'name',
              type: 'string',
            },
            {
              name: 'stop-type',
              alias: 'stop-type',
              type: 'string',
            },
            {
              name: 'atcoCode',
              alias: 'atcoCode',
              type: 'string',
            },
            {
              name: 'crs',
              alias: 'crs',
              type: 'string',
            },
          ],
          renderer: {
            type: 'simple',
            symbol: {
              type: 'picture-marker',
              url: mapMarker(mode),
              width: 24,
              height: 24,
            },
          },
        });

        map.add(stopsLayer);
        setIsStopsLayerCreated({ ...isStopsLayerCreated, [mode]: true });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [stops, location, map, isStopsLayerCreated]
  );

  useEffect(() => {
    if (!map || selectedModes.length === 0) return;
    selectedModes.forEach((mode) => {
      if (!isStopsLayerCreated[mode]) {
        createStopsLayer(mode);
      }
    });
  }, [isStopsLayerCreated, createStopsLayer, selectedModes, map]);

  return { isStopsLayerCreated, setIsStopsLayerCreated };
};

export default useCreateStopsLayer;
