/* eslint-disable */
// @ts-nocheck
import ReactDOMServer from 'react-dom/server';
// Components
import Route from 'components/shared/Route/Route';
import Button from 'components/shared/Button/Button';

const TimetableButtons = () => {
  const handleClick = (e: {
    target: { parentNode: { parentNode: { getAttribute: (arg0: string) => string } } };
  }) => {
    document.getElementById('timeBlock')?.remove();
    const iDiv = document.createElement('div');
    iDiv.id = 'timeBlock';
    document.getElementById(e.target.parentNode.parentNode.getAttribute('id')).appendChild(iDiv);
    iDiv.innerHTML = ReactDOMServer.renderToStaticMarkup(
      <Route route={[]} time />
    );
  };
  const times = [
    { time: '0830' },
    { time: '0930' },
    { time: '1030' },
    { time: '1130' },
    { time: '1230' },
    { time: '1330' },
    { time: '1430' },
    { time: '1530' },
    { time: '1630' },
  ];

  const timetableArray = [];
  let increment = 0;
  let subtract = 5;
  for (let i = 0; i < times.length / 5; i++) {
    const subarray = [];
    for (let u = increment; u < increment + subtract; u++) {
      subarray.push(
        <Button
          btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
          text={times[u].time}
          isActive={false}
          onClick={(e: any) => handleClick(e)}
        />
      );
    }
    increment += 5;
    subtract = times.length - increment > 5 ? 5 : times.length - increment;
    timetableArray.push(<div id={`div${i}`}>{subarray}</div>);
  }
  return <div>{timetableArray}</div>;
};

export default TimetableButtons;
