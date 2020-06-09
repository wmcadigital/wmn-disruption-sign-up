import React, { useState, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Button from 'components/shared/Button/Button';

const useStepLogic = (formRef) => {
  const { register, errors, triggerValidation, getValues } = useFormContext(); // Get useForm methods
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const [isContinuePressed, setIsContinuePressed] = useState(false); // State for tracking if continue has been pressed

  // Update the current step to the correct one depending on users selection
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await triggerValidation();
    setIsContinuePressed(true);
    // if no errors
    if (result) {
      formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: getValues() });
      formDataDispatch({
        type: 'UPDATE_STEP',
        payload: formDataState.currentStep + 1,
      });
    }
    // else, errors are true...
    else {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
    }
  };

  // Continue button
  const continueButton = (
    <Button
      btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md"
      type="submit"
      text="Continue"
    />
  );

  // If errors object has any keys and continue button is pressed then we should show generic error component
  const showGenericError = Object.keys(errors).length > 0 &&
    isContinuePressed && <GenericError />;

  return {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  };
};

export default useStepLogic;
