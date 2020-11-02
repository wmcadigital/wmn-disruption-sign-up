/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';
import Button from 'components/shared/Button/Button';
import useStepLogic from 'components/Form/useStepLogic';

const TrainAutoCompleteSelectLines = ({ setMode, trainStations }) => {
  const { formDataState, formDataDispatch, setStep } = useStepLogic(); // get formDataState and setStep logic from customHook
  useStepLogic();
  const [selectedLines, setSelectedLines] = useState(
    formDataState.formData?.Trains[0]?.LineIds || []
  ); // Set state of selected lines to what has already been selected or empty array

  // Run on change of select box
  const handleChange = (val) => {
    // If the selectedLine contains our line...
    if (selectedLines.includes(val)) {
      setSelectedLines((prev) => prev.filter((item) => item !== val)); // ...filter/remove it from the array
    } else {
      setSelectedLines((prev) => [...prev, val]); // Else, add it to the array
    }
  };

  // Run when continue button pressed
  const handleContinue = () => {
    // Set payload object
    const payload = {
      Trains: [
        {
          To: trainStations.To.name,
          From: trainStations.From.name,
          LineIds: selectedLines,
        },
      ],
    };
    formDataDispatch({ type: 'UPDATE_FORM_DATA', payload }); // Write new payload/data to global state

    // Go back to prev step
    setMode(null);
    setStep(formDataState.currentStep - 1);
  };

  return (
    <div className="wmnds-col-1">
      <h4>Select a train line</h4>
      <p>
        Two train lines are available between University and Birmingham New Street train stations.
      </p>
      <div className="wmnds-fe-group">
        <fieldset className="wmnds-fe-fieldset">
          {trainStations.From.lines.map((line) => (
            <div key={line}>
              <label className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
                {/* Left side (service number and route name) */}
                <div className="wmnds-disruption-indicator-medium wmnds-m-r-md wmnds-col-auto">
                  {line}
                </div>

                <div className="wmnds-fe-checkboxes__container wmnds-m-b-none">
                  {/* Right side for remove service button */}
                  <input
                    checked={selectedLines.includes(line)}
                    value={line}
                    onChange={(e) => handleChange(e.target.value)}
                    className="wmnds-fe-checkboxes__input"
                    type="checkbox"
                  />

                  <span className="wmnds-fe-checkboxes__checkmark">
                    <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
                  </span>
                </div>
              </label>
              <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
            </div>
          ))}
        </fieldset>
      </div>
      <Button
        btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-xl"
        text="Continue"
        onClick={handleContinue}
      />
    </div>
  );
};

TrainAutoCompleteSelectLines.propTypes = {
  setMode: PropTypes.func.isRequired,
  trainStations: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrainAutoCompleteSelectLines;
