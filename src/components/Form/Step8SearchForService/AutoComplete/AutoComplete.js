/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
// Import components
import useFormData from 'components/Form/useFormData';
import Button from 'components/shared/Button/Button';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';
import BusAutoComplete from './BusAutoComplete/BusAutoComplete';
import TrainAutoCompleteSelectLines from './TrainAutoComplete/TrainAutoCompleteSelectLines/TrainAutoCompleteSelectLines';

const AutoComplete = () => {
  const { formDataState, formDataDispatch, mode, setMode } = useFormData();
  const [trainStations, setTrainStations] = useState({});

  // Used to go back to previous step and wipes any train data stored
  const getPreviousStep = () => {
    formDataDispatch({ type: 'UPDATE_STEP', payload: formDataState.currentStep - 1 });
  };

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (text) => {
      return (
        <div className="wmnds-col-1">
          <h4>{text}</h4>
        </div>
      );
    };

    return (
      <div className="wmnds-grid">
        {mode === 'bus' && (
          <>
            {autoCompleteTitle(`Search for a ${mode} service`)}
            <BusAutoComplete mode={mode} setMode={setMode} />
          </>
        )}

        {mode === 'train' && (
          <>
            {(!trainStations.From || !trainStations.To) && (
              <div className="wmnds-col-1 wmnds-m-b-xl">
                <h4>Select trains between</h4>
                <TrainAutoComplete
                  mode={mode}
                  setMode={setMode}
                  trainStations={trainStations}
                  setTrainStations={setTrainStations}
                />
                <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
                <TrainAutoComplete
                  mode={mode}
                  setMode={setMode}
                  trainStations={trainStations}
                  setTrainStations={setTrainStations}
                  to
                />
              </div>
            )}

            {trainStations.From && trainStations.To && (
              <TrainAutoCompleteSelectLines setMode={setMode} trainStations={trainStations} />
            )}

            {(!trainStations.From || !trainStations.To) && (
              // Add cancel button
              <div className="wmnds-col-1 wmnds-col-md-2-5">
                <Button
                  btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
                  text="Cancel"
                  onClick={getPreviousStep}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

export default AutoComplete;
