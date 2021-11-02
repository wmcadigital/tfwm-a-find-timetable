import React, { useState, useEffect } from 'react';
import { useStopStationContext } from 'globalState';
import Icon from 'components/shared/Icon/Icon';
import Message from 'components/shared/Message/Message';
import s from './RadiusSearch.module.scss';

function RadiusSearch() {
  const [{ searchRadius }, stopStationDispatch] = useStopStationContext();
  const [error, setError] = useState<string | null>();

  const handleMinus = () => {
    stopStationDispatch({ type: 'UPDATE_SEARCH_RADIUS', payload: searchRadius - 1 });
  };
  const handleAdd = () => {
    stopStationDispatch({ type: 'UPDATE_SEARCH_RADIUS', payload: searchRadius + 1 });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopStationDispatch({ type: 'UPDATE_SEARCH_RADIUS', payload: Number(e.target.value) });
  };

  useEffect(() => {
    if (searchRadius > 100 || searchRadius < 0) {
      setError('Please enter a number between 1 and 100');
    } else {
      setError(null);
    }
  }, [searchRadius]);

  return (
    <div>
      <p className="wmnds-h4 wmnds-m-b-md">Enter search radius (miles)</p>
      <div className={`wmnds-grid wmnds-grid--spacing-3-lg ${s.container}`}>
        <div className="wmmds-col-auto">
          <button
            type="button"
            className={`${s.valueControl} ${s.minus}`}
            onClick={handleMinus}
            disabled={searchRadius < 2}
          >
            <Icon iconName="general-minimise" />
          </button>
        </div>
        <div className="wmnds-col-auto">
          <input
            className={`wmnds-fe-input ${s.searchInput}`}
            type="number"
            name="searchRadius"
            value={searchRadius}
            onChange={handleChange}
          />
        </div>
        <div className="wmmds-col-auto">
          <button
            type="button"
            className={`${s.valueControl} ${s.add}`}
            onClick={handleAdd}
            disabled={searchRadius >= 100}
          >
            <Icon iconName="general-expand" />
          </button>
        </div>
      </div>
      {error && <Message type="error" title="Invalid search radius" message={error} />}
    </div>
  );
}

export default RadiusSearch;
