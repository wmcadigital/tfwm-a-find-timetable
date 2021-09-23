// Using https://developers.arcgis.com/javascript/latest/api-reference/ and ESRI JS API
import { useRef } from 'react';
import s from './Map.module.scss';
import './Map.scss';
// Import custom hooks for map functionality
import useCreateMapView from './customHooks/useCreateMapView';

const Map = () => {
  // MAP SETUP
  const mapContainerRef = useRef<any>();
  useCreateMapView(mapContainerRef);

  return (
    <div className={`${s.mapView}`}>
      <div
        id="bus-areas-map"
        className={`${s.mapContainer} webmap busAreas-esri-map`}
        ref={mapContainerRef}
        title="Bus areas map"
      />
    </div>
  );
};

export default Map;
