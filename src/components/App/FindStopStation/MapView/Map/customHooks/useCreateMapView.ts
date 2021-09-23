/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState, useCallback } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';

const useCreateMapView = (mapContainerRef: any) => {
  const [viewState, setViewState] = useState<any>();
  const [isCreated, setIsCreated] = useState(false);

  const createMapView = useCallback(async () => {
    try {
      setDefaultOptions({ css: true }); // Load esri css by default
      const [Map, MapView, Basemap, VectorTileLayer, Graphic, GraphicsLayer, FeatureLayer] =
        await loadModules([
          'esri/Map',
          'esri/views/MapView',
          'esri/Basemap',
          'esri/layers/VectorTileLayer',
          'esri/Graphic',
          'esri/layers/GraphicsLayer',
          'esri/layers/FeatureLayer',
        ]);

      const basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            id: 'wmca-basemap',
            portalItem: {
              // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
              id: '53f165a8863c4d40ba017042e248355e',
            },
          }),
        ],
      });

      const view = new MapView({
        container: mapContainerRef.current,
        map: new Map({ basemap }),
        center: [-2.0047209, 52.4778132],
        constraints: {
          snapToZoom: true,
        },
      });

      // Move ui elements into the right position
      view.ui.move(['zoom'], 'top-right');
      view.ui.move(['attribution'], 'bottom');

      setViewState(view);
      setIsCreated(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [mapContainerRef]);

  useEffect(() => {
    if (!isCreated) {
      createMapView();
    }

    return () => {
      if (!viewState) return;
      viewState!.destroy();
    };
  }, [createMapView, isCreated, viewState]);

  return viewState;
};

export default useCreateMapView;
