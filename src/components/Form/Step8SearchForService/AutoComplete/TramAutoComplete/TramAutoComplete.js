import React, { useState } from 'react';
// Custom hooks
import useFormData from 'components/Form/useFormData';
import useStepLogic from 'components/Form/useStepLogic';
// Components
import Button from 'components/shared/Button/Button';
import TramAutoCompleteInput from './TramAutoCompleteInput';

const TrainAutoComplete = () => {
  const { setMode } = useFormData();
  const { formDataState, formDataDispatch, setStep } = useStepLogic();
  const [tramStops, setTramStops] = useState({ From: null, To: null });
  // Functions to pass to children
  const setTramStopFrom = (stop) =>
    setTramStops((prevState) => {
      return { ...prevState, From: stop };
    });

  const setTramStopTo = (stop) =>
    setTramStops((prevState) => {
      return { ...prevState, To: stop };
    });

  const goToPreviousStep = () => {
    setMode(null);
    setStep(formDataState.currentStep - 1);
  };

  const updateTramLines = () => {
    const { TramLines } = formDataState.formData;
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { TramLines: [...TramLines, tramStops] },
    });
    goToPreviousStep();
  };

  const bothStopsSelected = tramStops.From?.name && tramStops.To?.name;

  return (
    <>
      <div className="wmnds-col-1 wmnds-m-b-xl">
        <h4>Select stops between</h4>
        {/* From stop */}
        <TramAutoCompleteInput stop={tramStops.From} setStop={setTramStopFrom} />
        <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
        {/* To stop */}
        <TramAutoCompleteInput stop={tramStops.To} setStop={setTramStopTo} />
      </div>
      {bothStopsSelected ? (
        <Button btnClass="wmnds-btn wmnds-col-1" text="Continue" onClick={updateTramLines} />
      ) : (
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
            text="Cancel"
            onClick={goToPreviousStep}
          />
        </div>
      )}
    </>
  );
};

export default TrainAutoComplete;
