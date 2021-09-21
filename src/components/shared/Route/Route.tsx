const Route = ({ route }: { route: any[] }) => {
  return (
    <div className="wmnds-p-md wmnds-p-l-lg wmnds-p-r-lg wmnds-bg-white">
      <ul className="wmnds-timetable__route">
        {route.map((stop) => (
          <li key={`${stop.Id}_${stop.ArrivalDeparture}`} className="wmnds-timetable__route-item">
            <a href="#0">{stop.Name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Route;
