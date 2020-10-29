import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import useFormData from '../useFormData';

const Step4Phone = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  // Check it we are facing an existing user
  const { ExistingUser } = useFormData();

  // Labels used on inputs and for validation
  const phoneLabel = 'Mobile phone number';
  // Logic used to validate the phone field
  const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/; // Regex expression only for uk mobile numbers found in this website (2nd reply) - https://community.dynamics.com/crm/f/microsoft-dynamics-crm-forum/119483/javascript-regex-uk-phone-number
  const phoneValidation = register({
    required: `${phoneLabel} is required`,
    pattern: {
      value: phoneRegex,
      message: `Enter a ${phoneLabel.toLowerCase()} in the correct format`,
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      {!ExistingUser && (
        <SectionStepInfo section="Section 1 of 2" description="About you" />
      )}

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your mobile phone number?</h2>
          <p>We’ll automatically send disruption alerts to this number.</p>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-4-5"
          name="Phone"
          label={`${phoneLabel}, for example: 07700900090`}
          type="tel"
          fieldValidation={phoneValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step4Phone;
