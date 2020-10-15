import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import InputCheckbox from 'components/shared/FormElements/Input/InputCheckbox';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import useFormData from '../useFormData';

const Step3SmsConsent = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  // Check if it is an existing user
  const { ExistingUser } = useFormData();

  // Labels used on inputs and for validation
  const checkBoxLabel = `Please tick this box if you accept the Terms and Conditions and ${' '}
  <a
    href="https://www.wmca.org.uk/policies"
    target="_blank"
    title="Read our Privacy Policy"
    rel="noopener noreferrer"
  >
    Privacy Policy
  </a>`;

  // Logic used to validate the email field
  const checkboxValidation = register({
    required: 'Agree to terms and conditions before continue',
    validate: {
      shouldBeTrue: (val) =>
        val === true || 'Agree to terms and conditions before continue',
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

      <fieldset className="wmnds-fe-fieldset wmnds-col-1 wmnds-col-lg-4-5">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>Text message service disruptions trial Terms & Conditions</h2>

          <h4>Terms and conditions for Transport for West Midlands (TfWM)</h4>
          <h4>Introduction</h4>
          <p>
            These Website Standard Terms and Conditions written on this webpage
            shall manage your use of our website, West Midlands Network
            accessible at wmnetwork.co.uk.
          </p>
          <p>
            These Terms will be applied fully and affect to your use of this
            service. By using this service, you agree to accept all terms and
            conditions written in here. You must not use this service if you
            disagree with any of these Website Standard Terms and Conditions.
          </p>
          <h4>Your Privacy</h4>
          <p>Please read our Privacy Policy.</p>
          <h4>Severability</h4>
          <p>
            If any provision of these Terms is found to be invalid under any
            applicable law, such provisions shall be deleted without affecting
            the remaining provisions herein.
          </p>
          <h4>Variation of Terms</h4>
          <p>
            Transport for West Midlands (TfWM) is permitted to revise these
            Terms at any time as it sees fit, and by using this service you are
            expected to review these Terms on a regular basis.
          </p>
          <h4>Assignment </h4>
          <p>
            The Transport for West Midlands (TfWM) is allowed to assign,
            transfer, and subcontract its rights and/or obligations under these
            Terms without any notification. However, you are not allowed to
            assign, transfer, or subcontract any of your rights and/or
            obligations under these Terms.
          </p>
          <h4>Entire Agreement</h4>
          <p>
            These Terms constitute the entire agreement between Transport for
            West Midlands (TfWM) and you in relation to your use of this
            service, and supersede all prior agreements and understandings.
          </p>
        </legend>

        <InputCheckbox
          name="SMSTerms"
          type="checkbox"
          fieldValidation={checkboxValidation}
          labelValue={checkBoxLabel}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step3SmsConsent;
