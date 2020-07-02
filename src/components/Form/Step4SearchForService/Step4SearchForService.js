/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

// Import components
import Autocomplete from './autocomplete/Autocomplete';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';

function Step4SearchForService() {
  const [mode, setMode] = useState('bus');

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
    </form>
  );
}

export default Step4SearchForService;
