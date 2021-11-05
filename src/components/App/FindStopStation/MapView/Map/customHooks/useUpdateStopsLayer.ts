/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect } from 'react';
import { useStopStationContext } from 'globalState';

import { loadModules } from 'esri-loader';

const useUpdateStopsLayer = (isStopsLayerCreated: boolean, view: any) => {
  const map = view !== null && view?.map;
  const [{ stops }] = useStopStationContext();

  const updateMapStops = useCallback(async () => {
    try {
      const [Graphic] = await loadModules(['esri/Graphic']);
      const stopsLayer = map.findLayerById(`stopsLayer`);

      const applyEditsToLayer = (edits: any, layer: any) => {
        layer
          .applyEdits(edits)
          .then()
          .catch((error: any) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      };

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

      if (view && stops) {
        const stopGraphics = stops.map((stop: any) => {
          return {
            attributes: {
              name: stop.properties.name,
              atcoCode: stop.properties.atcoCode,
              stopType: stop.properties.type,
              mapIcon: getStopType(stop.properties.type),
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

        if (stopsLayer) {
          stopsLayer.queryFeatures().then((results: any) => {
            const edits = {
              deleteFeatures: results.features,
              addFeatures: stopGraphics,
            };
            // apply edits to the layer
            applyEditsToLayer(edits, stopsLayer);
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [view, stops, map]);

  useEffect(() => {
    if (!isStopsLayerCreated || !map) return;
    updateMapStops();
  }, [isStopsLayerCreated, updateMapStops, map]);

  return { updateMapStops };
};

export default useUpdateStopsLayer;
