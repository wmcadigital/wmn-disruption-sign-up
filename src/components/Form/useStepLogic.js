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

  // Function for setting the step of the form
  const setStep = (step) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: step,
    });
  };

  // Update the current step to the correct one depending on users selection
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await triggerValidation();
    setIsContinuePressed(true);
    // if no errors
    if (result) {
      formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: getValues() });

      if (formDataState.currentStep === 6 && getValues().DisruptionAlert === 'no') {
        // If user opts out of disruption alerts (on step 6), skip quiet hours (step 7) and go to summary
        setStep(8);
      } else {
        setStep(formDataState.hasReachedConfirmation ? 8 : formDataState.currentStep + 1);
      }

      // EXISTING USERS: exceptions to the usual workflow
      if (formDataState.formData.ExistingUser && formDataState.currentStep === 3) {
        // Step3: Keep receiving email alerts?  ->  Step 8: Summary
        setStep(8);
      }
    }
    // else, errors are true...
    else {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
    }
  };

  // Continue button
  const continueButton = (isFetching) => (
    <Button
      btnClass="wmnds-btn wmnds-col-1 wmnds-col-sm-auto"
      type="submit"
      text="Continue"
      isFetching={isFetching}
    />
  );

  // If errors object has any keys and continue button is pressed then we should show generic error component
  const showGenericError = Object.keys(errors).length > 0 && isContinuePressed && <GenericError />;

  return {
    setStep,
    register,
    handleSubmit,
    showGenericError,
    continueButton,
    formDataState,
    formDataDispatch,
  };
};

export default useStepLogic;
