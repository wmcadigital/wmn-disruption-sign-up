import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import InsetText from 'components/shared/InsetText/InsetText';

function Step2SmsAlert() {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const radioButtons = [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ];

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">
            Do you want to receive text message alerts for disruptions?
          </h2>
          <p>We’ll automatically send text message alerts straight to your mobile phone.</p>
          <InsetText
            classes="wmnds-m-b-lg"
            content="You can choose quiet hours or days. We won’t send you text or email alerts during those times."
          />
        </legend>

        <Radios
          name="SMSAlert"
          classes="wmnds-m-b-sm"
          radios={radioButtons}
          fieldValidation={register({
            required: `Please select one option to proceed`,
          })}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton()}
    </form>
  );
}

export default Step2SmsAlert;
