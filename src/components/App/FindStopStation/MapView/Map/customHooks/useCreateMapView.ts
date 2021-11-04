/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState, useCallback } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import { useStopStationContext } from 'globalState';
import mapMarker from 'globalState/helpers/mapMarker';

const useCreateMapView = (mapContainerRef: any) => {
  const [viewState, setViewState] = useState<any>();
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [{ stops }] = useStopStationContext();

  const createMapView = useCallback(async () => {
    try {
      setDefaultOptions({ css: true }); // Load esri css by default
      const [
        Map,
        MapView,
        Basemap,
        VectorTileLayer,
        Graphic,
        GraphicsLayer,
        FeatureLayer,
        watchUtils,
        Circle,
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/FeatureLayer',
        'esri/core/watchUtils',
        'esri/geometry/Circle',
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
        zoom: 13,
        constraints: {
          snapToZoom: true,
        },
      });

      const circleGeometry = new Circle({
        center: [-2.0047209, 52.4778132],
        geodesic: true,
        numberOfPoints: 100,
        radius: 1,
        radiusUnit: 'miles',
      });

      const circleGraphic = new Graphic({
        geometry: circleGeometry,
        symbol: {
          type: 'simple-fill',
          style: 'solid',
          color: [157, 91, 175, 0.2],
          outline: {
            style: 'none',
          },
        },
      });

      const pinMarker = new Graphic({
        geometry: {
          type: 'point',
          longitude: -2.0047209,
          latitude: 52.4778132,
          spatialreference: {
            wkid: 4326,
          },
        },
        symbol: {
          type: 'picture-marker',
          url: mapMarker(),
          width: 24,
          height: 24,
        },
      });

      const circleLayer = new GraphicsLayer({
        graphics: [circleGraphic, pinMarker],
      });

      view.map.add(circleLayer);

      // Move ui elements into the right position
      view.ui.move(['zoom'], 'top-right');
      view.ui.move(['attribution'], 'bottom');
      view.whenLayerView(circleLayer).then((layerView: any) => {
        watchUtils.whenFalse(layerView, 'updating', () => {
          setIsLoading(false);
        });
      });
      view.goTo(circleLayer);
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

  return { viewState, isLoading };
};

export default useCreateMapView;
