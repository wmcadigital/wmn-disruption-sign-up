import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import InsetText from 'components/shared/InsetText/InsetText';
import useFormData from '../useFormData';

const Step6EmailAlert = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const radioButtons = [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ];

  // Add InsetText with extra info when selected option is "no"
  let extraInfo;
  const selectedOption = document.querySelector(
    'input.wmnds-fe-radios__input[name="EmailAlert"]:checked'
  );
  if (selectedOption && selectedOption.value === 'no') {
    extraInfo = (
      <InsetText
        classes="wmnds-m-b-lg"
        content="You can always sign up to email alerts later in the disruption alerts dashboard."
      />
    );
  }

  // Check if it is an existing user already
  const { ExistingUser } = useFormData();
  let title;
  let text;
  if (ExistingUser) {
    title = 'Would you like to continue receiving email alerts?';
    text =
      'In addition to text message alerts, we’ll send automatic disruption alerts to your email address.';
  } else {
    title = 'Would you like to sign up to email alerts?';
    text = 'You’ll receive automatic disruption alerts to your email address.';
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      {!ExistingUser && <SectionStepInfo section="Section 1 of 2" description="About you" />}

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>{title}</h2>
          <p>{text}</p>
        </legend>

        <Radios
          name="EmailAlert"
          radios={radioButtons}
          fieldValidation={register({
            required: `Please select one option to proceed`,
          })}
        />

        {extraInfo}
      </fieldset>

      {/* Continue button */}
      {continueButton()}
    </form>
  );
};

export default Step6EmailAlert;
