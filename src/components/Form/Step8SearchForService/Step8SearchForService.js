/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react';
import { FormDataContext } from '../../../globalState/FormDataContext';

// Import components
import Autocomplete from './autocomplete/Autocomplete';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';
import Button from '../../shared/Button/Button';

function Step8SearchForService() {
  const [mode, setMode] = useState('bus');
  const [formDataState, formDataDispatch] = useContext(FormDataContext);

  const getPreviousStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep - incrementAmount,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div className="wmnds-col-1">
        {/* Subsection */}
        <SectionStepInfo section="Section 2 of 2" description="Services" />
        <h2 className="">Add a service</h2>
        <p className="wmnds-col-2-3">
          You can sign up to 10 services at a time.
        </p>
        <p>You will receive an automatic email update for each disruption</p>
        <Autocomplete mode={mode} setMode={setMode} />
      </div>

      <Button
        btnClass="wmnds-btn wmnds-btn--destructive wmnds-col-1 wmnds-m-t-md"
        text="Cancel"
        onClick={() => {
          getPreviousStep(1);
        }}
      />
    </form>
  );
}

export default Step8SearchForService;
