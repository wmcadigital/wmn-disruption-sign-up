import React, { useContext, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Helper
import { getSearchParam, delSearchParam } from 'helpers/URLSearchParams';
// Import components
import Step0Recovery from './Step0Recovery/Step0Recovery';
import Step1Name from './Step1Name/Step1Name';
import Step5Email from './Step5Email/Step5Email';
import Step6EmailAlert from './Step6EmailAlert/Step6EmailAlert';
import Step7AddService from './Step7AddService/Step7AddService';
import Step8SearchForService from './Step8SearchForService/Step8SearchForService';
import Step9Confirm from './Step9Confirm/Step9Confirm';
import StepDisruptionAlert from './StepDisruptionAlert/StepDisruptionAlert';
import StepQuietHours from './StepQuietHours/StepQuietHours';
import SubmitSuccess from './Step10SubmitConfirmation/Success';
import SubmitError from './Step10SubmitConfirmation/Error';
// Custom Hooks
import useTrackFormAbandonment from './useTrackFormAbandonment';
// Import styling
import s from './Form.module.scss';

const Form = ({
  formSubmitStatus,
  setFormSubmitStatus,
  isRecoverLinkPressed,
  setIsFormStarted,
  setIsRecoverLinkPressed,
}) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { currentStep, hasReachedConfirmation } = formDataState; // Destructure step from state
  const { ExistingUser } = formDataState.formData;
  const methods = useForm({
    mode: 'onBlur',
  }); // Trigger validation onBlur events (config for react hook form lib)

  useEffect(() => {
    if (isRecoverLinkPressed) {
      formDataDispatch({
        type: 'UPDATE_STEP',
        payload: 0,
      });
    }
  }, [formDataDispatch, isRecoverLinkPressed]);

  useTrackFormAbandonment(currentStep, formSubmitStatus);

  // Show debug options for below (this should be deleted on release)
  const debugStepOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let stepToGoTo;

  if (!ExistingUser) {
    // NEW USERS: Show back button if the step is between 2 and 7
    if (currentStep > 1 && currentStep < 8) {
      stepToGoTo = currentStep - 1;
    }
  }

  const goBackOnRequestLinkStep = () => {
    if (getSearchParam('requestLink')) delSearchParam('requestLink');
    setIsRecoverLinkPressed(false);
    setIsFormStarted(false);
  };

  // Handle scrolling to the top of the summary page
  const formRef = useRef();
  const scrollToTopOfSummary = useCallback(() => {
    const page = document.getElementsByClassName('wmnds-html')[0];
    const pageOffset = page.scrollTop;
    const formOffset = formRef.current.offsetTop;
    if (formOffset >= pageOffset) return;
    page.scrollTo(0, formOffset - 20);
  }, []);

  useEffect(() => {
    if (currentStep === 8) scrollToTopOfSummary();
  }, [currentStep, scrollToTopOfSummary]);

  // Run! Like go get some data from an API.
  return (
    <>
      {/* pass all methods into the context */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormContext {...methods}>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          {stepToGoTo && (
            <div className="wmnds-col-1 wmnds-m-b-md">
              <button
                type="button"
                className="wmnds-btn wmnds-btn--link"
                onClick={() =>
                  formDataDispatch({
                    type: 'UPDATE_STEP',
                    payload: hasReachedConfirmation ? 11 : stepToGoTo,
                  })
                }
              >
                &lt; Back
              </button>
            </div>
          )}
          {currentStep === 0 && (
            <div className="wmnds-col-1 wmnds-m-b-md">
              <button
                type="button"
                className="wmnds-btn wmnds-btn--link"
                onClick={goBackOnRequestLinkStep}
              >
                &lt; Back
              </button>
            </div>
          )}

          <div
            className={formSubmitStatus === null ? `${s.formWrapper} wmnds-p-lg ` : ''}
            ref={formRef}
          >
            {/* Start of form */}
            {currentStep === 0 && <Step0Recovery setFormSubmitStatus={setFormSubmitStatus} />}
            {currentStep === 1 && <Step1Name />}
            {currentStep === 2 && <Step5Email />}
            {currentStep === 3 && <Step6EmailAlert />}
            {currentStep === 4 && <Step7AddService />}
            {currentStep === 5 && <Step8SearchForService />}
            {currentStep === 6 && <StepDisruptionAlert />}
            {currentStep === 7 && <StepQuietHours />}
            {currentStep === 8 && <Step9Confirm setFormSubmitStatus={setFormSubmitStatus} />}
            {/* for testing only */}
            {currentStep === 9 && <SubmitSuccess />}
            {currentStep === 10 && <SubmitError />}
          </div>
        </div>
        {/* If in development based on envs then show form debugging */}
        {process.env.NODE_ENV !== 'production' && (
          <div
            className="wmnds-col-1 wmnds-col-md-1-4 wmnds-p-md"
            style={{
              overflowX: 'auto',
              position: 'fixed',
              right: 0,
            }}
          >
            <pre>{JSON.stringify(formDataState, null, 2)}</pre>
            <br />
            <div className="wmnds-col-1">
              Select step: {}
              <select
                onChange={(e) =>
                  formDataDispatch({
                    type: 'UPDATE_STEP',
                    payload: +e.target.value,
                  })
                }
                onBlur={(e) =>
                  formDataDispatch({
                    type: 'UPDATE_STEP',
                    payload: +e.target.value,
                  })
                }
                value={currentStep}
              >
                {debugStepOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </FormContext>
    </>
  );
};

Form.propTypes = {
  formSubmitStatus: PropTypes.bool,
  setFormSubmitStatus: PropTypes.func.isRequired,
  setIsFormStarted: PropTypes.func.isRequired,
  isRecoverLinkPressed: PropTypes.bool,
  setIsRecoverLinkPressed: PropTypes.func.isRequired,
};

Form.defaultProps = {
  formSubmitStatus: null,
  isRecoverLinkPressed: false,
};

export default Form;
