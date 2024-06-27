/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';

function Step1Name() {
  const formRef = useRef(); // Used so we can keep track of the form DOM element

  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(); // Custom hook for handling continue button (validation, errors etc)

  // Labels used on inputs and for validation
  const fNameLabel = 'First name';
  const lNameLabel = 'Last name';

  // Logic used to validate fields
  const fieldValidation = (name) => {
    return { ...register(name, { required: true }) };
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">What is your name?</h2>
          <p>
            We’ll use this information to personalise email notifications so they are not marked as
            spam in your inbox.
          </p>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-3-4"
          name="Firstname"
          label={fNameLabel}
          autocomplete="given-name"
          fieldValidation={fieldValidation('Firstname')}
        />
        <Input
          className="wmnds-col-1 wmnds-col-lg-3-4"
          name="LastName"
          label={lNameLabel}
          autocomplete="family-name"
          fieldValidation={fieldValidation('LastName')}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton()}
    </form>
  );
}

export default Step1Name;
