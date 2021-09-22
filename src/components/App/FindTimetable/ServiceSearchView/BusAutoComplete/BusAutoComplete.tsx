// Import context
import { useTimetableContext } from 'globalState';
// Import components
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';

const BusAutoComplete = ({ id, label, name }: { id: string; label?: string; name: string }) => {
  const [{ busQuery }, timetableDispatch] = useTimetableContext();

  // set query state on input change
  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    timetableDispatch({ type: 'UPDATE_BUS_QUERY', payload: e.target.value });
  };

  return (
    <AutoComplete
      id={id}
      label={label}
      name={name}
      placeholder="Search"
      onUpdate={onUpdate}
      initialQuery={busQuery || ''}
    />
  );
};

export default BusAutoComplete;
