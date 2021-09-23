import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import s from './SearchResult.module.scss';

const SearchResult = ({
  mode,
  text,
  distance,
  handleClick,
}: {
  mode: string;
  text: string;
  distance: string;
  handleClick: () => void;
}) => {
  return (
    <div className={`wmnds-grid wmnds-grid--spacing-2-sm ${s.result}`}>
      <div className="wmnds-col-auto">
        <Icon iconName={`modes-bg-${mode}`} className={`${s.icon} ${s[mode]}`} />
      </div>
      <div className="wmnds-col-auto">
        <Button text={text} btnClass="wmnds-btn--link" onClick={handleClick} />
        <p className="wmnds-m-none">{distance}</p>
      </div>
    </div>
  );
};

export default SearchResult;
