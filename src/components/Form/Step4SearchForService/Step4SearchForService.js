/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { FormDataContext } from '../../../globalState/FormDataContext';

// Import components
import Autocomplete from './autocomplete/Autocomplete';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';

function Step4SearchForService() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { currentStep } = formDataState;
  const [mode, setMode] = useState(null);
  const [bus, setBus] = useState(formDataState.formData.BusServices || []);

  useEffect(() => {
    const busServiceId = [];
    bus.map((single) => {
      return busServiceId.push(single.serviceId);
    });
    // formDataDispatch({
    //   type: 'UPDATE_FORM_DATA',
    //   payload: { LineId: busServiceId, BusServices: bus },
    // });
  }, [bus, currentStep, formDataDispatch, mode]);

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
        <h2 className="">Add a service 2</h2>
        <p className="wmnds-col-2-3">
          You can sign up to 10 services at a time.
        </p>
        <p>You will receive an automatic email update for each disruption</p>
        <Autocomplete mode={mode} setMode={setMode} setBus={setBus} />
      </div>
    </form>
  );
}

export default Step4SearchForService;
