/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState, useCallback, useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { loadModules, setDefaultOptions } from 'esri-loader';
// eslint-disable-next-line import/no-unresolved
import locateCircle from 'assets/svgs/map/locate-circle.svg';

const useCreateMapView = (mapContainerRef: any) => {
  const [viewState, setViewState] = useState<any>();
  const [isCreated, setIsCreated] = useState(false);

  const createMapView = useCallback(async () => {
    try {
      setDefaultOptions({ css: true }); // Load esri css by default
      const [Map, MapView, Basemap, VectorTileLayer, Graphic, Locate, GraphicsLayer, Polygon] =
        await loadModules([
          'esri/Map',
          'esri/views/MapView',
          'esri/Basemap',
          'esri/layers/VectorTileLayer',
          'esri/Graphic',
          'esri/widgets/Locate',
          'esri/layers/GraphicsLayer',
          'esri/geometry/Polygon',
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

      // Create a locate button
      const locateBtn = new Locate({
        id: 'geolocation',
        view,
        popupEnabled: false,
        goToOverride: (e: any, { target }: { target: any }) => view.goTo(target.target),
        graphic: new Graphic({
          // overwrites the default symbol used for the graphic placed at the location of the user when found
          symbol: {
            type: 'picture-marker',
            url: locateCircle, // Set to svg circle when user hits 'locate' button
            height: '150px',
            width: '150px',
          },
        }),
      });

      // Move ui elements into the right position
      view.ui.move(['zoom'], 'top-right');
      view.ui.move(['attribution'], 'bottom');
      view.ui.add(locateBtn, { position: 'top-right' });

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
