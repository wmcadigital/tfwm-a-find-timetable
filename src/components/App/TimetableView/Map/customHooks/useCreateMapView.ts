/* eslint-disable prettier/prettier */
import { useEffect, useState, useCallback } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import mapMarker from 'assets/svgs/map/map-marker.svg';

const useCreateMapView = (mapContainerRef: any, results: any) => {
  const [viewState, setViewState] = useState<any>();
  const [isCreated, setIsCreated] = useState(false);

  const createMapView = useCallback(async () => {
    try {
      setDefaultOptions({ css: true }); // Load esri css by default
      const [Map, MapView, Basemap, VectorTileLayer, Graphic, GraphicsLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
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

      const stopMarker = {
        type: 'picture-marker',
        url: mapMarker,
        width: 24,
        height: 24,
      };

      const stopA = new Graphic({
        geometry: {
          type: 'point',
          longitude: results.Coordinates[0][0].lng,
          latitude: results.Coordinates[0][0].lat,
          spatialreference: {
            wkid: 4326,
          },
        },
        symbol: stopMarker,
      });

      const stopB = new Graphic({
        geometry: {
          type: 'point',
          longitude: results.Coordinates[0][results.Coordinates[0].length - 1].lng,
          latitude: results.Coordinates[0][results.Coordinates[0].length - 1].lat,
          spatialreference: {
            wkid: 4326,
          },
        },
        symbol: stopMarker,
      });

      const polylineGraphic = new Graphic({
        geometry: {
          type: 'polyline',
          paths: results.Coordinates[0].map((coords: any) => [coords.lng, coords.lat]),
        },
        symbol: {
          type: 'simple-line',
          width: 2,
          color: '#9D5BAF',
        },
      });

      const stopsLayer = new GraphicsLayer({
        graphics: [polylineGraphic, stopA, stopB],
      });

      view.map.add(stopsLayer);

      // Move ui elements into the right position
      view.ui.move(['zoom'], 'top-right');
      view.ui.move(['attribution'], 'bottom');
      view.goTo(polylineGraphic);

      setViewState(view);
      setIsCreated(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [mapContainerRef, results]);

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
