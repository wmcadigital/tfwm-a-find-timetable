// Using https://developers.arcgis.com/javascript/latest/api-reference/ and ESRI JS API
import s from './Map.module.scss';
import './Map.scss';

const Map = () => {
  return (
    <div className={`${s.mapView}`}>
      <div className={`${s.mapContainer} webmap busAreas-esri-map`}>Map </div>
    </div>
  );
};

export default Map;
