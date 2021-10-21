import { useState, useRef, useEffect } from 'react';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';

const TimetableTime = ({
  time,
  // stops,
  isOpen,
  handleOpen,
  handleClose,
}: {
  time: string;
  // stops: any[];
  isOpen?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    if (contentRef.current) {
      const setHeight = () => {
        setContentHeight(contentRef.current.offsetHeight);
      };
      setHeight();
      window.addEventListener('resize', setHeight);
    }
  }, [contentRef]);

  return (
    <div className="wmnds-timetable__time">
      <Button
        text={time}
        btnClass="wmnds-btn--secondary wmnds-timetable__time-toggle"
        isActive={isOpen}
        onClick={handleOpen}
      />
      <div className="wmnds-timetable__time-details" style={{ height: `${contentHeight}px` }}>
        <div ref={contentRef} className="wmnds-timetable__time-details-content">
          <Button
            text="Close"
            btnClass="wmnds-btn--link wmnds-timetable__time-close wmnds-is--active"
            iconRight="general-cross"
            onClick={handleClose}
          />
          <ul className="wmnds-timetable__route">
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1010</strong>
              <a href="#0">Stop 1</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1013</strong>
              <a href="#0">Stop 2</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1016</strong>
              <a href="#0">Stop 3</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1019</strong>
              <a href="#0">Stop 4</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1022</strong>
              <a href="#0">Stop 5</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1025</strong>
              <a href="#0">Stop 6</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1028</strong>
              <a href="#0">Stop 7</a>
            </li>
            <li className="wmnds-timetable__route-item">
              <strong className="wmnds-timetable__route-item-time">1031</strong>
              <a href="#0">Stop 8</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ServiceTimetable = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  return (
    <div>
      <h3>Timetable</h3>
      <div className="wmnds-p-lg wmnds-bg-white">
        <p className="wmnds-h4 wmnds-m-b-md wmnds-m-t-none">
          Stourbridge - Wolverhampton via Kingswinford
        </p>
        <div className="wmnds-warning-text ">
          <Icon iconName="general-info" className="wmnds-warning-text__icon" />
          This is the latest timetable (last updated 2 July 2021)
        </div>
        <p className="wmnds-h4 wmnds-m-b-md">Select day of the week</p>
        <div className="wmnds-col-1-2 wmnds-col-sm-auto">
          <div className="wmnds-grid wmnds-grid--spacing-sm-3-md">
            <div className="wmnds-col-1 wmnds-col-sm-auto">
              <Button
                text="Monday to Friday"
                btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-sm-auto wmnds-m-b-xsm"
                isActive
              />
            </div>
            <div className="wmnds-col-1 wmnds-col-sm-auto">
              <Button
                text="Saturday"
                btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-sm-auto wmnds-m-b-xsm"
              />
            </div>
            <div className="wmnds-col-1 wmnds-col-sm-auto">
              <Button
                text="Sunday"
                btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-sm-auto wmnds-m-b-xsm"
              />
            </div>
          </div>
        </div>
        <h4>Select a departure time</h4>
        <p>Show the route from this stop at the departure time</p>
        <div className="wmnds-timetable">
          <TimetableTime
            time="1010"
            isOpen={selectedTime === '1010'}
            handleOpen={() => setSelectedTime('1010')}
            handleClose={() => setSelectedTime(null)}
          />
          <TimetableTime
            time="1020"
            isOpen={selectedTime === '1020'}
            handleOpen={() => setSelectedTime('1020')}
            handleClose={() => setSelectedTime(null)}
          />
        </div>
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-t-md">
          <div className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-m-b-md">
            <div className="wmnds-file-download">
              <Icon iconName="general-file" className="wmnds-file-download__icon" />
              <div className="wmnds-file-download__desc">
                <a
                  href="#0"
                  title="link title"
                  target="_self"
                  className="wmnds-link wmnds-file-download__link"
                  download="file_name.pdf"
                >
                  Download ‘Full Timetable’ (PDF)
                </a>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-3">
            <Button btnClass="wmnds-btn--primary wmnds-col-1" text="View full route" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTimetable;
