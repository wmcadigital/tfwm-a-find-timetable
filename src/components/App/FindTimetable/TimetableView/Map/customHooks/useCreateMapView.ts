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

      const stopGraphics = results.stopData.map((stop: any) => {
        return new Graphic({
          attributes: {
            name: stop.Name,
          },
          geometry: {
            type: 'point',
            longitude: stop.Lon,
            latitude: stop.Lat,
            spatialreference: {
              wkid: 4326,
            },
          },
        });
      });

      const polylineGraphic = new Graphic({
        geometry: {
          type: 'polyline',
          paths: results.routeMap.Coordinates[0].map((coords: any) => [coords.lng, coords.lat]),
        },
        symbol: {
          type: 'simple-line',
          width: 2,
          color: '#9D5BAF',
        },
      });

      const routeLayer = new GraphicsLayer({
        graphics: [polylineGraphic],
      });

      const stopsLayer = new FeatureLayer({
        id: 'serviceStopsMapView',
        title: 'Stops on this route',
        source: stopGraphics,
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
        ],
        renderer: {
          type: 'simple',
          symbol: {
            type: 'picture-marker',
            url: mapMarker,
            width: 24,
            height: 24,
          },
        },
      });

      const popup = {
        featureCount: 0,
        actions: [
          {
            title: '{name}',
            id: 'add-stop',
            image: mapMarker,
            className: 'esri-add-stop',
          },
        ],
      };
      stopsLayer.popupTemplate = popup;

      view.map.add(routeLayer);
      view.map.add(stopsLayer);

      view.popup.visibleElements = {
        featureNavigation: false,
      };
      view.popup.dockEnabled = false;
      view.popup.highlightEnabled = true;
      // view.popup.dockOptions = { buttonEnabled: false };

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
