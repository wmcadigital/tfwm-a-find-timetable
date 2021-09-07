// Import context
import { useFormContext } from 'globalState';
// Import components
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';

const TrainAutoComplete = () => {
  const [{ trainQuery }, formDispatch] = useFormContext();

  // set query state on input change
  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>, direction: 'from' | 'to') => {
    formDispatch({
      type: 'UPDATE_RAIL_QUERY',
      payload: { ...trainQuery, [direction]: e.target.value },
    });
  };

  return (
    <div>
      <div className="wmnds-m-b-sm">
        <label className="wmnds-h4" htmlFor="trainSearchFrom">
          From
        </label>
      </div>
      <AutoComplete
        id="trainSearchFrom"
        name="trainSearch"
        placeholder="Search"
        onUpdate={(e) => onUpdate(e, 'from')}
        initialQuery={trainQuery?.from || ''}
      />
      <div className="wmnds-m-t-md wmnds-m-b-sm">
        <label className="wmnds-h4" htmlFor="trainSearchTo">
          To
        </label>
      </div>
      <AutoComplete
        id="trainSearchTo"
        name="trainSearch"
        placeholder="Search"
        onUpdate={(e) => onUpdate(e, 'to')}
        initialQuery={trainQuery?.to || ''}
      />
    </div>
  );
};

export default TrainAutoComplete;
