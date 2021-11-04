/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from 'react';
import { loadModules } from 'esri-loader';
import { useStopStationContext } from 'globalState';
import mapMarker from 'globalState/helpers/mapMarker';

const useCreateStopsLayer = (view: any) => {
  const [isStopsLayerCreated, setIsStopsLayerCreated] = useState(false);
  const map = view !== null && view?.map;

  const [{ stops }] = useStopStationContext();

  const createStopsLayer = useCallback(async () => {
    try {
      if (stops.length === 0) return;
      const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

      const stopGraphics = stops.map((stop: any) => {
        return {
          attributes: {
            name: stop.properties.name,
            atcoCode: stop.properties.atcoCode,
            stopType: stop.properties.type,
            crs: stop.properties.crs,
          },
          geometry: {
            type: 'point',
            longitude: stop.geometry.coordinates[0],
            latitude: stop.geometry.coordinates[1],
            spatialreference: {
              wkid: 4326,
            },
          },
        };
      });

      const layerAttrs = {
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
      };
      const stopsLayerRenderer = (mode: string) => {
        return {
          type: 'simple',
          symbol: {
            type: 'picture-marker',
            url: mapMarker(mode),
            width: 24,
            height: 24,
          },
        };
      };
      const busGraphics = stopGraphics.filter((stop) => stop.attributes.stopType === 'bus-stop');
      const tramGraphics = stopGraphics.filter((stop) => stop.attributes.stopType === 'tram-stop');
      const trainGraphics = stopGraphics.filter(
        (stop) => stop.attributes.stopType === 'rail-station'
      );

      const busStopsLayer = new FeatureLayer({
        id: 'busStops',
        title: 'Nearest bus stops',
        source: busGraphics, // autocast as a Collection of new Graphic()
        ...layerAttrs,
        renderer: stopsLayerRenderer('bus'),
      });
      const tramStopsLayer = new FeatureLayer({
        id: 'tramStops',
        title: 'Nearest tram stops',
        source: tramGraphics, // autocast as a Collection of new Graphic()
        ...layerAttrs,
        renderer: stopsLayerRenderer('tram'),
      });
      const trainStationsLayer = new FeatureLayer({
        id: 'trainStations',
        title: 'Nearest train stops',
        source: trainGraphics, // autocast as a Collection of new Graphic()
        ...layerAttrs,
        renderer: stopsLayerRenderer('train'),
      });

      map.add(busStopsLayer);
      map.add(tramStopsLayer);
      map.add(trainStationsLayer);
      map.reorder(busStopsLayer, 5);
      map.reorder(trainStationsLayer, 6);
      map.reorder(tramStopsLayer, 7);

      setIsStopsLayerCreated(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [stops, map]);

  useEffect(() => {
    if (isStopsLayerCreated || !map) return;
    createStopsLayer();
  }, [isStopsLayerCreated, createStopsLayer, map]);

  return { isStopsLayerCreated, setIsStopsLayerCreated };
};

export default useCreateStopsLayer;
