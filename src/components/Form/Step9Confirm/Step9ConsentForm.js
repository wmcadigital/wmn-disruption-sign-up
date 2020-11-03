import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import InputCheckbox from '../../shared/FormElements/Input/InputCheckbox';

const Step9ConsentForm = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  // Labels used on inputs and for validation
  const checkBoxLabel = (
    <>
      I have read the &nbsp;
      <a
        href="https://www.wmca.org.uk/policies"
        target="_blank"
        title="Read our Privacy Policy"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      &nbsp; and agree to be emailed about disruptions.
    </>
  );
  // Logic used to validate the email field
  const checkboxValidation = register({
    required: 'Agree to terms and conditions before continue',
    validate: {
      shouldBeTrue: (val) =>
        val === true || 'Agree to terms and conditions before continue',
    },
  });

  return (
    <fieldset className="wmnds-fe-fieldset" ref={formRef}>
      <h3 className="wmnds-m-t-lg wmnds-m-b-lg">Consent</h3>
      <InputCheckbox
        name="Terms"
        type="checkbox"
        fieldValidation={checkboxValidation}
        labelElement={checkBoxLabel}
      />
    </fieldset>
  );
};

export default Step9ConsentForm;
