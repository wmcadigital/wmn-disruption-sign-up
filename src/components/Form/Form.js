import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';
// Import contexts

import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import Step1Name from './Step1Name/Step1Name';
import Step2SmsAlert from './Step2SmsAlert/Step2SmsAlert';
import Step3SmsConsent from './Step3SmsConsent/Step3SmsConsent';
import Step4Phone from './Step4Phone/Step4Phone';
import Step5Email from './Step5Email/Step5Email';
import Step6EmailAlert from './Step6EmailAlert/Step6EmailAlert';
import Step7AddService from './Step7AddService/Step7AddService';
import Step8SearchForService from './Step8SearchForService/Step8SearchForService';
import Step9Confirm from './Step9Confirm/Step9Confirm';
import SubmitSuccess from './Step10SubmitConfirmation/Success';
import SubmitError from './Step10SubmitConfirmation/Error';

import useTrackFormAbandonment from './useTrackFormAbandonment';

// Import styling
import s from './Form.module.scss';

const Form = ({ formSubmitStatus, setFormSubmitStatus }) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { currentStep, hasReachedConfirmation } = formDataState; // Destructure step from state
  const { ExistingUser } = formDataState.formData;
  const methods = useForm({
    mode: 'onBlur',
  }); // Trigger validation onBlur events (config for react hook form lib)

  useTrackFormAbandonment(currentStep, formSubmitStatus);

  // Show debug options for below (this should be deleted on release)
  const debugStepOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Run! Like go get some data from an API.
  return (
    <>
      {/* pass all methods into the context */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormContext {...methods}>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          {/* NEW USERS: Show back button if the step is between 1 or 9 */}
          {!ExistingUser && currentStep > 1 && currentStep < 9 && (
            <div className="wmnds-col-1 wmnds-m-b-md">
              <button
                type="button"
                className={`wmnds-link ${s.asLink}`}
                onClick={() =>
                  formDataDispatch({
                    type: 'UPDATE_STEP',
                    payload: hasReachedConfirmation ? 9 : currentStep - 1,
                  })
                }
              >
                &lt; Back
              </button>
            </div>
          )}

          {/* EXISTING USERS: Show back button if the step is 4 or 6. Step 3 has no back button */}
          {ExistingUser &&
            currentStep > 3 &&
            currentStep < 9 &&
            currentStep !== 6 && (
              <div className="wmnds-col-1 wmnds-m-b-md">
                <button
                  type="button"
                  className={`wmnds-link ${s.asLink}`}
                  onClick={() =>
                    formDataDispatch({
                      type: 'UPDATE_STEP',
                      payload: hasReachedConfirmation ? 9 : currentStep - 1,
                    })
                  }
                >
                  &lt; Back
                </button>
              </div>
            )}
          {/* Exception: on click back button (on step 6) -> step 4 */}
          {ExistingUser && currentStep === 6 && (
            <div className="wmnds-col-1 wmnds-m-b-md">
              <button
                type="button"
                className={`wmnds-link ${s.asLink}`}
                onClick={() =>
                  formDataDispatch({
                    type: 'UPDATE_STEP',
                    payload: hasReachedConfirmation ? 9 : 4,
                  })
                }
              >
                &lt; Back
              </button>
            </div>
          )}

          <div
            className={
              formSubmitStatus === null ? `${s.formWrapper} wmnds-p-lg ` : ''
            }
          >
            {/* Start of form */}
            {currentStep === 1 && <Step1Name />}
            {currentStep === 2 && <Step2SmsAlert />}
            {currentStep === 3 && <Step3SmsConsent />}
            {currentStep === 4 && <Step4Phone />}
            {currentStep === 5 && <Step5Email />}
            {currentStep === 6 && <Step6EmailAlert />}
            {currentStep === 7 && <Step7AddService />}
            {currentStep === 8 && <Step8SearchForService />}
            {currentStep === 9 && (
              <Step9Confirm setFormSubmitStatus={setFormSubmitStatus} />
            )}
            {/* for testing only */}
            {currentStep === 10 && <SubmitSuccess />}
            {currentStep === 11 && <SubmitError />}
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
};

Form.defaultProps = {
  formSubmitStatus: null,
};

export default Form;
