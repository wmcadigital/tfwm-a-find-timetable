import { Link } from 'react-router-dom';
import s from './Route.module.scss';

const Route = ({ route, time }: { route: any[]; time: boolean }) => {
  return (
    <div className="wmnds-p-md wmnds-p-l-lg wmnds-p-r-lg wmnds-bg-white">
      <ul className="wmnds-timetable__route">
        {route?.map((stop) => (
          <li key={`${stop.Id}_${stop.ArrivalDeparture}`} className="wmnds-timetable__route-item">
            {time && <span className={s.timeLabel}>0830</span>}
            <Link to={`/stop/${stop.NaPTAN}`}>{stop.Name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Route;
