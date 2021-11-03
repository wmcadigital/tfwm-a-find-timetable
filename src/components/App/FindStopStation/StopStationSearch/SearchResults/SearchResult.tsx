import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon/Icon';
import s from './SearchResult.module.scss';

const SearchResult = ({
  mode,
  text,
  distance,
  atcoCode,
}: {
  mode: string;
  text: string;
  distance: string;
  atcoCode: string;
}) => {
  return (
    <div className={`wmnds-grid wmnds-grid--spacing-2-sm ${s.result}`}>
      <div className="wmnds-col-auto">
        <Icon iconName={`modes-bg-${mode}`} className={`${s.icon} ${s[mode]}`} />
      </div>
      <div className="wmnds-col-auto">
        <Link to={`/${mode === 'rail' ? 'station' : 'stop'}/${atcoCode}`}>{text}</Link>
        <p className="wmnds-m-none">{distance}</p>
      </div>
    </div>
  );
};

export default SearchResult;
