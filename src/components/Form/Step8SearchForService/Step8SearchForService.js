/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

// Import components
import Autocomplete from './autocomplete/Autocomplete';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';

function Step8SearchForService() {
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
          We’ll send an automatic disruption alert for each service you add.
        </p>

        <Autocomplete mode={mode} setMode={setMode} />
      </div>
    </form>
  );
}

export default Step8SearchForService;
