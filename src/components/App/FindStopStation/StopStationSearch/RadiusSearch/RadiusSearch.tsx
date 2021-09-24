import { useState, useEffect } from 'react';
import Icon from 'components/shared/Icon/Icon';
import Message from 'components/shared/Message/Message';
import s from './RadiusSearch.module.scss';

function RadiusSearch() {
  const [radius, setRadius] = useState<number>(1);
  const [error, setError] = useState<string | null>();

  const handleMinus = () => {
    setRadius(radius - 1);
  };
  const handleAdd = () => {
    setRadius(radius + 1);
  };

  useEffect(() => {
    if (radius > 100 || radius < 0) {
      setError('Please enter a number between 1 and 100');
    } else {
      setError(null);
    }
  }, [radius]);

  return (
    <div>
      <p className="wmnds-h4 wmnds-m-b-md">Enter search radius (miles)</p>
      <div className={`wmnds-grid wmnds-grid--spacing-3-lg ${s.container}`}>
        <div className="wmmds-col-auto">
          <button
            type="button"
            className={`${s.valueControl} ${s.minus}`}
            onClick={handleMinus}
            disabled={radius < 2}
          >
            <Icon iconName="general-minimise" />
          </button>
        </div>
        <div className="wmnds-col-auto">
          <input
            className={`wmnds-fe-input ${s.searchInput}`}
            type="number"
            name="searchRadius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </div>
        <div className="wmmds-col-auto">
          <button
            type="button"
            className={`${s.valueControl} ${s.add}`}
            onClick={handleAdd}
            disabled={radius >= 100}
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
