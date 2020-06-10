import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import InputCheckbox from '../../shared/FormElements/Input/InputCheckbox';

const Step4ConsentForm = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit } = useStepLogic(formRef, false); // Custom hook for handling continue button (validation, errors etc)

  // Labels used on inputs and for validation
  // const checkBoxLabel = `I have read the${' '}
  // <a
  //   href="https://www.wmca.org.uk/policies"
  //   target="_blank"
  //   title="Read our Privacy Policy"
  //   rel="noopener noreferrer"
  // >
  //   Privacy Policy
  // </a>${' '}
  // and agree to be emailed about disruptions.`
  // Logic used to validate the email field

  const checkboxValidation = register({
    required: 'Agree to terms and conditions before continue',
  });

  return (
    <fieldset className="wmnds-fe-fieldset" ref={formRef}>
      <InputCheckbox
        name="Terms"
        label="label"
        type="checkbox"
        value={false}
        fieldValidation={checkboxValidation}
        onChange={(e) => {
          handleSubmit(e);
        }}
      />
    </fieldset>
  );
};

export default Step4ConsentForm;
