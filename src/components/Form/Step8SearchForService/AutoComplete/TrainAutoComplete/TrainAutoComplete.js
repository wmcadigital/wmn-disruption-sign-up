import React, { useState } from 'react';
// Custom hooks
import useFormData from 'components/Form/useFormData';
import useStepLogic from 'components/Form/useStepLogic';
// Components
import Button from 'components/shared/Button/Button';
import TrainAutoCompleteInput from './TrainAutoCompleteInput';
import TrainAutoCompleteSelectLines from './TrainAutoCompleteSelectLines/TrainAutoCompleteSelectLines';

const TrainAutoComplete = () => {
  const { setMode } = useFormData();
  const { formDataState, formDataDispatch, setStep } = useStepLogic();
  const [trainStations, setStations] = useState({ From: null, To: null });
  // Functions to pass to children
  const setTrainStationFrom = (station) =>
    setStations((prevState) => {
      return { ...prevState, From: station };
    });

  const setTrainStationTo = (station) =>
    setStations((prevState) => {
      return { ...prevState, To: station };
    });

  const goToPreviousStep = () => {
    setMode(null);
    setStep(formDataState.currentStep - 1);
  };

  const bothStationsSelected = trainStations.From?.name && trainStations.To?.name;

  return (
    <>
      {bothStationsSelected ? (
        <TrainAutoCompleteSelectLines
          goToPreviousStep={goToPreviousStep}
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
              btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
              text="Cancel"
              onClick={goToPreviousStep}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TrainAutoComplete;
