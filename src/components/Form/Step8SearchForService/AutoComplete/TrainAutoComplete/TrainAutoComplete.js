import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Components
import Button from 'components/shared/Button/Button';
import TrainAutoCompleteInput from './TrainAutoCompleteInput';
import TrainAutoCompleteSelectLines from './TrainAutoCompleteSelectLines';

const TrainAutoComplete = ({ closeAutoComplete }) => {
  const { formDataState, formDataDispatch } = useStepLogic();
  const [trainStations, setStations] = useState({ From: null, To: null });

  // Functions to pass to children
  const setTrainStation = (direction) => (station) => {
    setStations((prevState) => {
      return { ...prevState, [direction]: station };
    });
  };
  const setTrainStationFrom = setTrainStation('From');
  const setTrainStationTo = setTrainStation('To');

  // Helper boolean
  const bothStationsSelected = trainStations.From?.name && trainStations.To?.name;

  return (
    <>
      {bothStationsSelected ? (
        <TrainAutoCompleteSelectLines
          closeAutoComlplete={closeAutoComplete}
          formDataDispatch={formDataDispatch}
          formDataState={formDataState}
          trainStations={trainStations}
        />
      ) : (
        <>
          <div className="wmnds-col-1 wmnds-m-b-xl">
            <h4>Select trains between</h4>
            {/* From station */}
            <TrainAutoCompleteInput station={trainStations.From} setStation={setTrainStationFrom} />
            <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
            {/* To station */}
            <TrainAutoCompleteInput station={trainStations.To} setStation={setTrainStationTo} />
          </div>
          <div className="wmnds-col-1 wmnds-col-md-2-5">
            <Button
              btnClass="wmnds-btn wmnds-btn--primary"
              text="Cancel"
              onClick={closeAutoComplete}
            />
          </div>
        </>
      )}
    </>
  );
};

TrainAutoComplete.propTypes = {
  closeAutoComplete: PropTypes.func.isRequired,
};

export default TrainAutoComplete;
