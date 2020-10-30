import React from 'react';
import PropTypes from 'prop-types';
// Import components
import useFormData from 'components/Form/useFormData';
import Button from 'components/shared/Button/Button';
import BusAutoComplete from './BusAutoComplete';
import TrainAutoComplete from './TrainAutoComplete';

const AutoComplete = ({ mode, setMode }) => {
  const { formDataState, formDataDispatch } = useFormData();
  const getPreviousStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep - incrementAmount,
    });
  };

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    return (
      <div className="wmnds-grid">
        {mode === 'bus' && (
          <>
            <div className="wmnds-col-1">
              <h4>{`Search for a ${mode} service`}</h4>
            </div>
            <BusAutoComplete mode={mode} setMode={setMode} />
          </>
        )}
        {mode === 'train' && (
          <div className="wmnds-col-1">
            <h4>Select trains between</h4>
            <TrainAutoComplete mode={mode} setMode={setMode} />
            <h4>and</h4>
            <TrainAutoComplete mode={mode} setMode={setMode} />
            {/* Add cancel button */}
            <div className="wmnds-col-1 wmnds-col-md-2-5">
              <Button
                btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
                text="Cancel"
                onClick={() => {
                  getPreviousStep(1);
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

AutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default AutoComplete;
