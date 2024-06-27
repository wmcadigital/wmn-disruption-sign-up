import React, { useRef, useState } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import InsetText from 'components/shared/InsetText/InsetText';
import useFormData from '../useFormData';

function StepDisruptionAlert() {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const [radioValue, setRadioValue] = useState();
  const radioButtons = [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ];
  const setCurrentValue = (e) => {
    setRadioValue(e.toLowerCase());
  };

  // Add InsetText with extra info when selected option is "no"
  let extraInfo;

  if (radioValue && radioValue === 'no') {
    extraInfo = (
      <InsetText
        classes="wmnds-m-b-lg wmnds-m-t-none"
        content="You can set quiet hours and days later in the disruption alerts dashboard."
      />
    );
  }

  // Check if it is an existing user already
  const { ExistingUser } = useFormData();
  const title = 'Do you want to choose when to receive disruption alerts?';
  const text =
    'You can set quiet hours and days so you only receive alerts when it’s best for you.';

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      {!ExistingUser && <SectionStepInfo section="Section 1 of 2" description="Services" />}

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{title}</h2>
          <p>{text}</p>
        </legend>
        <Radios
          name="DisruptionAlert"
          classes={extraInfo ? 'wmnds-m-b-sm' : ''}
          radios={radioButtons}
          onChange={(e) => setCurrentValue(e.target.value)}
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
}

export default StepDisruptionAlert;
