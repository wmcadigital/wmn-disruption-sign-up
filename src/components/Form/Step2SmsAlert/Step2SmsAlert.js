import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
//import Radios from 'components/shared/FormElements/Radios/Radios';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';

const Step2SmsAlert = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const radioButtons = [
    { text: 'Yes', value: '0' },
    { text: 'No', value: '1' },
  ];

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>
            Would you like to sign up to the SMS service disruptions trial?
          </h2>
          <p>
            We’ll automatically send SMS message alerts straight to your phone.
          </p>
        </legend>
        {/*         
        <Radios
          name="SMS Alert"
          label="Would you like to sign up to the SMS service disruptions trial?"
          radios={radioButtons}
          fieldValidation=""
        />
        */}
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step2SmsAlert;
