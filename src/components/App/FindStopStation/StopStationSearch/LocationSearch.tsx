import React, { useState } from 'react';
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import { useStopStationContext } from 'globalState';
import { ILocation } from 'globalState/StopStationContext/types/ILocation';
import useLocationAPI from '../customHooks/useLocationAPI';
import useGetStopsAPI from '../customHooks/useGetStopsAPI';

const LocationSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<ILocation | null>(null);
  const { loading, results } = useLocationAPI(query);
  useGetStopsAPI();
  const [, stopStationDispatch] = useStopStationContext();

  // console.log(
  //   stops.results
  //     .filter((stop) => stop.properties.type !== 'bus-stop' && stop.properties.type !== 'car-park')
  //     .map((stop) => stop.properties.type)
  // );

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSelect = (result: ILocation) => {
    setSelectedItem(result);
    stopStationDispatch({ type: 'UPDATE_LOCATION', payload: result });
  };

  return (
    <div>
      <p className="wmnds-h4">Enter a location</p>
      <p className="wmnds-m-b-xsm">A postcode, road name or place of interest</p>
      <AutoComplete
        name="LocationSearch"
        placeholder="Search"
        onUpdate={onUpdate}
        loading={loading}
        results={results}
        selectedItem={selectedItem}
        onSelectResult={onSelect}
      />
    </div>
  );
};

export default LocationSearch;
