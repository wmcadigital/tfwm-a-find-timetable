import { useStopStationContext } from 'globalState';
import SearchResult from './SearchResult';

const SearchResults = ({ classes }: { classes?: string }) => {
  const [{ stops }] = useStopStationContext();
  const handleClick = () => {
    console.log('click');
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

  return (
    <div>
      {stops.map((stop) => (
        <div className={classes}>
          <SearchResult
            mode={getStopType(stop.properties.type)}
            distance="0.3 miles away"
            text={stop.properties.name}
            handleClick={handleClick}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
