import { useStopStationContext } from 'globalState';
import SearchResult from './SearchResult';

const SearchResults = ({ classes }: { classes?: string }) => {
  const [{ stops }] = useStopStationContext();

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

  return (
    <div>
      {stops.map((stop) => (
        <div className={classes}>
          <SearchResult
            mode={getStopType(stop.properties.type)}
            distance={`${stop.locationDistance?.toFixed(1)} miles away`}
            text={stop.properties.name}
            atcoCode={stop.properties.atcoCode}
            key={stop.properties.atcoCode}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
