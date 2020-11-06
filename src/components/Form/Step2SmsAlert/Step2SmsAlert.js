import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import InsetText from 'components/shared/InsetText/InsetText';

const Step2SmsAlert = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const radioButtons = [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ];

  const selectedOption = document.querySelector(
    'input.wmnds-fe-radios__input[name="SMSAlert"]:checked'
  );
  let extraInfo;
  if (selectedOption && selectedOption.value === 'no') {
    extraInfo = (
      <InsetText
        classes="wmnds-m-b-lg"
        content="You can also sign up to the text message service disruptions trial later in the disruption alerts dashboard."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>
            Would you like to sign up to a trial to receive text message alerts 
            for disruptions?
          </h2>
          <p>
            We’ll automatically send text message alerts straight to your mobile
            phone.
          </p>
        </legend>

        <Radios
          name="SMSAlert"
          classes={extraInfo ? 'wmnds-m-b-sm' : ''}
          radios={radioButtons}
          fieldValidation={register({
            required: `Please select one option to proceed`,
          })}
        />
        {extraInfo}
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step2SmsAlert;
