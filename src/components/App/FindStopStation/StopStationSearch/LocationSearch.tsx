import React, { useState } from 'react';
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import { useStopStationContext } from 'globalState';
import { ILocation } from 'globalState/StopStationContext/types/ILocation';
import useLocationAPI from '../customHooks/useLocationAPI';

const LocationSearch = ({ label }: { label?: string }) => {
  const [query, setQuery] = useState<string>('');
  const [{ location }, stopStationDispatch] = useStopStationContext();
  const [selectedItem, setSelectedItem] = useState<ILocation | null>(location);
  const { loading, results } = useLocationAPI(query);

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSelect = (result: ILocation) => {
    setSelectedItem(result);
    stopStationDispatch({ type: 'UPDATE_LOCATION', payload: result });
  };

  return (
    <div>
      {!label && (
        <>
          <p className="wmnds-h4">Enter a location</p>
          <p className="wmnds-m-b-xsm">A postcode, road name or place of interest</p>
        </>
      )}
      <AutoComplete
        name="LocationSearch"
        placeholder="Search"
        onUpdate={onUpdate}
        loading={loading}
        results={results}
        selectedItem={selectedItem}
        onSelectResult={onSelect}
        label={label}
      />
    </div>
  );
};

export default LocationSearch;
