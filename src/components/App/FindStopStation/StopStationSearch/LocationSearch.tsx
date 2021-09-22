import React from 'react';
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';

function LocationSearch() {
  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  return (
    <div>
      <p className="wmnds-h4">Enter a location</p>
      <p className="wmnds-m-b-xsm">A postcode, road name or place of interest</p>
      <AutoComplete name="LocationSearch" placeholder="Search" onUpdate={onUpdate} />
    </div>
  );
}

export default LocationSearch;
