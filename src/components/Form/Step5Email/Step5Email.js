import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';

const Step5Email = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  // Labels used on inputs and for validation
  const emailLabel = 'Email address';
  // Logic used to validate the email field
  const emailRegex = /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server
  const emailValidation = register({
    required: `${emailLabel} is required`,
    pattern: {
      value: emailRegex,
      message: `Enter an ${emailLabel.toLowerCase()} in the correct format`,
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your email address?</h2>
          <p>We’ll automatically send disruption alerts to this address</p>
        </legend>

        <Input
          className="wmnds-col-sm-1-2"
          name="Email"
          label={`${emailLabel}, for example name@example.com`}
          type="email"
          autocomplete="email"
          fieldValidation={emailValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step5Email;
