import SearchResult from './SearchResult';

const SearchResults = ({ classes }: { classes?: string }) => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div>
      <div className={classes}>
        <SearchResult
          mode="rail"
          distance="0.3 miles away"
          text="Birmingham New Street"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SearchResults;
