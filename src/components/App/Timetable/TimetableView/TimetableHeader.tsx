import { useState, useEffect } from 'react';
// Import API hook
import formatDate from 'globalState/helpers/formatDate';
// Import components
import Button from 'components/shared/Button/Button';
import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import FileDownload from 'components/shared/FileDownload/FileDownload';
import WarningText from 'components/shared/WarningText/WarningText';
// import Map from './Map/Map';

import s from './TimetableView.module.scss';

const TimetableHeader = ({
  showInbound,
  timetableHeader,
  when,
  toggleDirection,
  handleWhen,
}: {
  showInbound: boolean;
  timetableHeader: any;
  when: string;
  toggleDirection: () => void;
  handleWhen: (w: string) => void;
}) => {
  const [timetableData, setTimetableData] = useState<any>(null);
  const d = new Date(timetableHeader.BaseRoute.ValidFrom);
  const startDate = formatDate(d);

  useEffect(() => {
    if (showInbound && timetableHeader) {
      setTimetableData(timetableHeader?.InboundTimetables);
    } else {
      setTimetableData(timetableHeader?.OutboundTimetables);
    }
  }, [showInbound, timetableHeader]);

  return (
    <div className={`wmnds-col-md-2-3 wmnds-m-b-md ${s.timetableView}`}>
      <div className={`wmnds-grid wmnds-grid--spacing-3-md wmnds-m-b-lg ${s.timetableHeader}`}>
        <div className="wmnds-col-auto">
          <DisruptionIndicator text={timetableHeader.BaseRoute.ServiceNumber} />
        </div>
        <div className={`wmnds-col-auto ${s.routeDescription}`}>
          <h1 className="wmnds-h3 wmnds-m-none">{timetableData?.RouteDescription}</h1>
        </div>
        <div className="wmnds-col-auto">
          <Button
            onClick={toggleDirection}
            btnClass="wmnds-btn--secondary"
            text="Change direction"
            iconRight="general-swap"
          />
        </div>
      </div>
      <p>
        <a href="#0">{timetableHeader.BaseRoute.OperatorName}</a> runs this service
      </p>
      <WarningText>This is the latest timetable (last updated {startDate})</WarningText>
      <FileDownload
        text="Download ‘Full Timetable’ (PDF)"
        fileName="timetable.pdf"
        href={`https://journeyplanner.networkwestmidlands.com/Timetables/Download/${encodeURI(
          timetableHeader.BaseRoute.LineName.replaceAll(':', '_')
        )}/${timetableHeader.BaseRoute.VersionNumber}/${encodeURI(
          timetableHeader.BaseRoute.VersionNumber
        )}_${timetableHeader.BaseRoute.ServiceNumber}/False`}
      />
      <h2 className="wmnds-h3 wmnds-m-b-md">When</h2>
      <div>
        <Button
          btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
          text="Monday to Friday"
          isActive={when === '0'}
          onClick={() => handleWhen('0')}
        />
        <Button
          btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
          text="Saturday"
          isActive={when === '2'}
          onClick={() => handleWhen('2')}
        />
        <Button
          btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
          text="Sunday"
          isActive={when === '3'}
          onClick={() => handleWhen('3')}
        />
      </div>
    </div>
  );
};

export default TimetableHeader;
