/* eslint-disable react/button-has-type */
import React from 'react';
// Import components
import Autocomplete from './AutoComplete/AutoComplete';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';

function Step8SearchForService() {
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
        <h2>Add a service</h2>
        <p>
          We’ll send an automatic disruption alert for each service you add.
        </p>

        <Autocomplete />
      </div>
    </form>
  );
}

export default Step8SearchForService;
