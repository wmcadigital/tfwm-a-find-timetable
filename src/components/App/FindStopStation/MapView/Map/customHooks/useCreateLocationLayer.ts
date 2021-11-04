import { useEffect, useState, useCallback } from 'react';
import { loadModules } from 'esri-loader';
import { useStopStationContext } from 'globalState';
import mapMarker from 'globalState/helpers/mapMarker';

const useCreateLocationLayer = (view: any) => {
  const [isLocationLayerCreated, setIsLocationLayerCreated] = useState(false);
  const map = view !== null && view?.map;

  const [{ location, searchRadius }] = useStopStationContext();

  const createLocationLayer = useCallback(async () => {
    try {
      if (!location) return;
      const [GraphicsLayer, Circle, Graphic] = await loadModules([
        'esri/layers/GraphicsLayer',
        'esri/geometry/Circle',
        'esri/Graphic',
      ]);

      const circleGeometry = new Circle({
        center: [location.location.x, location.location.y],
        geodesic: true,
        numberOfPoints: 100,
        radius: searchRadius || 1,
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
          longitude: location.location.x,
          latitude: location.location.y,
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

      const locationLayer = new GraphicsLayer({
        graphics: [circleGraphic, pinMarker],
      });

      view.goTo(circleGraphic);
      map.add(locationLayer);
      map.reorder(locationLayer, 5);
      setIsLocationLayerCreated(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [location, view, map, searchRadius]);

  useEffect(() => {
    if (isLocationLayerCreated || !map) return;
    createLocationLayer();
  }, [isLocationLayerCreated, createLocationLayer, map]);

  return { isLocationLayerCreated, setIsLocationLayerCreated };
};

export default useCreateLocationLayer;
