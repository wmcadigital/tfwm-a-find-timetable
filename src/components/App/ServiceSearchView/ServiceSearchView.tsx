// Import context
import { useFormContext } from 'globalState';
// Import components
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import Button from 'components/shared/Button/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import ServiceResult from './ServiceResult/ServiceResult';

const results = [
  {
    id: '52871',
    mode: 'bus',
    serviceNumber: 's16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'outbound',
        operatorCode: 'CLA',
        operatorName: 'Claribel Coaches',
        routeName: 'Solihull - Yardley via Lyndon',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'CLA',
        operatorName: 'Claribel Coaches',
        routeName: 'Yardley - Solihull via Lyndon',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '44666',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'outbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Birmingham - Hamstead via Hockley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Hamstead - Birmingham via Hockley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '59731',
    mode: 'bus',
    serviceNumber: 'x16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'inbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Birmingham - Kingsbury - Stonydelph - Belgrave',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Belgrave - Stonydelph - Kingsbury - Birmingham',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Belgrave - Stonydelph - Kingsbury - Birmingham',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Birmingham - Kingsbury - Stonydelph - Belgrave',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '4626',
    mode: 'bus',
    serviceNumber: '16a',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'outbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Birmingham - Great Barr via Hockley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Great Barr - Birmingham via Hockley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '128122',
    mode: 'bus',
    serviceNumber: 's16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'outbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Telford - Rodington',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Rodington - Telford',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Telford - Rodington',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '63732',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'outbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Wolverhampton to Stourbridge',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Stourbridge to Wolverhampton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Wolverhampton to Penn',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Wolverhampton to Kingswinford',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Penn to Wolverhampton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Kingswinford to Wolverhampton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Wolverhampton to Wombourne Town Centre',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Wombourne Town Centre to Wolverhampton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'NXB',
        operatorName: 'National Express West Midlands',
        routeName: 'Wall Heath to Wolverhampton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '28808',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'inbound',
        operatorCode: 'TCV',
        operatorName: 'National Express Coventry',
        routeName: 'Keresley Village - Coventry via Radford Rd',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'TCV',
        operatorName: 'National Express Coventry',
        routeName: 'Coventry - Keresley Village via Radford Rd',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '102869',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'outbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: 'Hanley - Werrington - Cheddleton - Leek ( - Buxton)',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: 'Hanley - Werrington - Cheddleton - Leek ( - Buxton)',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: 'Hanley - Werrington - Cheddleton - Leek ( - Buxton)',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: 'Hanley - Werrington - Cheddleton - Leek ( - Buxton)',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: '',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: 'Hanley - Werrington - Cheddleton - Leek ( - Buxton)',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: 'Hanley - Werrington - Cheddleton - Leek ( - Buxton)',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DGC',
        operatorName: 'D & G Bus',
        routeName: '(Buxton - ) Leek - Cheddleton - Werrington - Hanley',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '78820',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'inbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Hadley - Wellington - High Ercall - Telford',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Telford - Hadley - Wellington - High Ercall',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Hadley - Wellington - High Ercall - Telford',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Telford - Hadley - Wellington - High Ercall',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Hadley - Wellington - High Ercall - Telford',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'AMN',
        operatorName: 'Arriva Midlands',
        routeName: 'Hadley - Wellington - High Ercall - Telford',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '69295',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'inbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Hatton Park - Hampton Magna - Warwick - Leek Wootton - Kenilworth',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Kenilworth - Leek Wootton - Warwick - Hampton Magna - Hatton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Kenilworth - Leek Wootton - Warwick - Hampton Magna - Hatton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Hatton Park - Hampton Magna - Warwick - Leek Wootton - Kenilworth',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Hatton Park - Hampton Magna - Warwick - Leek Wootton - Kenilworth',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Hatton Park - Hampton Magna - Warwick - Leek Wootton - Kenilworth',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'SMR',
        operatorName: 'Stagecoach Midlands',
        routeName: 'Kenilworth - Leek Wootton - Warwick - Hampton Magna - Hatton',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
  {
    id: '95418',
    mode: 'bus',
    serviceNumber: '16',
    hasDisruptions: false,
    disruptionSeverity: 'none',
    routes: [
      {
        direction: 'inbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Birmingham - West Bromwich via Hamstead',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'West Bromwich - Birmingham via Hamstead',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Birmingham - West Bromwich via Hamstead',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Birmingham - West Bromwich via Hamstead',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'inbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'Birmingham - West Bromwich via Hamstead',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
      {
        direction: 'outbound',
        operatorCode: 'DIA',
        operatorName: 'Diamond Bus',
        routeName: 'West Bromwich - Birmingham via Hamstead',
        hasDisruption: false,
        disruptionSeverity: 'none',
      },
    ],
  },
];

const ServiceSearch = () => {
  const [{ selectedMode }, formDispatch] = useFormContext();
  const selectMode = (mode: 'bus' | 'rail' | 'metro') => {
    formDispatch({ type: 'UPDATE_SELECTED_MODE', payload: mode });
  };
  return (
    <div>
      <h1>Find a timetable</h1>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <div className="wmnds-p-md wmnds-bg-white">
            <div className="wmnds-m-b-md wmnds-text-align-right">
              <Button text="Clear search" btnClass="wmnds-btn--link" />
            </div>
            <p className="wmnds-h4 wmnds-m-t-none">Select mode of transport</p>
            <div className="wmnds-grid wmnds-grid wmnds-grid--justify-between">
              <Button
                onClick={() => selectMode('bus')}
                text="Bus"
                btnClass="wmnds-btn--mode"
                iconLeft="modes-isolated-bus"
                isActive={selectedMode === 'bus'}
              />
              <Button
                onClick={() => selectMode('rail')}
                text="Train"
                btnClass="wmnds-btn--mode"
                iconLeft="modes-isolated-rail"
                isActive={selectedMode === 'rail'}
              />
              <Button
                onClick={() => selectMode('metro')}
                text="Tram"
                btnClass="wmnds-btn--mode"
                iconLeft="modes-isolated-metro"
                isActive={selectedMode === 'metro'}
              />
            </div>
            {selectedMode && (
              <>
                <div className="wmnds-m-t-lg">
                  <p className="wmnds-h4 wmnds-m-t-none">Enter a service number</p>
                  <AutoComplete
                    placeholder="Search"
                    name="busSearch"
                    onUpdate={() => console.log('update')}
                    onSelectResult={() => console.log('selected result')}
                  />
                </div>
                <div className="wmnds-m-t-lg">
                  <Dropdown label="Filter by bus company" name="filter" error={null} options={[]} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <div className="wmnds-h3 wmnds-m-t-none wmnds-m-b-lg">
            {results.length} result{results.length !== 1 && 's'}
          </div>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
            {results.map((result) => (
              <div key={result.id} className="wmnds-col-1 wmnds-col-md-1-2 wmnds-m-b-lg">
                <ServiceResult result={result} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSearch;
