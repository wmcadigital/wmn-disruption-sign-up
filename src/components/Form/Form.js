import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import components
import Step1Name from './Step1Name/Step1Name';
import Step2Email from './Step2Email/Step2Email';
import Step3AddService from './Step3AddService/Step3AddService';
import Step4Confirm from './Step4Confirm/Step4Confirm';
// Import custom hooks
import useSubmitForm from './useSubmitForm';
// Import styling
import s from './Form.module.scss';

const Form = ({ formSubmitStatus, setFormSubmitStatus }) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { currentStep } = formDataState; // Destructure step from state
  console.log(formSubmitStatus);
  const methods = useForm({
    mode: 'onBlur',
  }); // Trigger validation onBlur events (config for react hook form lib)

  // Get handleSubmit fn and isFetching from custom hook which handles submitting data to API (this is used in the last step[4])
  const { handleSubmit, isFetching, APIErrorMessage } = useSubmitForm(
    setFormSubmitStatus
  );

  // Show debug options for below (this should be deleted on release)
  const debugStepOptions = [1, 2, 3, 4];

  return (
    <>
      {/* pass all methods into the context */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormContext {...methods}>
        <div className="wmnds-col-1 wmnds-col-md-3-4 ">
          {/* Show back button if the step is between 1 or 11 */}
          {currentStep > 1 && currentStep < 11 && (
            <div className="wmnds-col-1 wmnds-m-b-md">
              <button
                type="button"
                className={`wmnds-link ${s.changeBtn}`}
                onClick={() =>
                  formDataDispatch({
                    type: 'UPDATE_STEP',
                    payload: currentStep - 1,
                  })
                }
              >
                &lt; Back
              </button>
            </div>
          )}
          <div className={`wmnds-p-lg ${s.formWrapper}`}>
            {/* Start of form */}
            {currentStep === 1 && <Step1Name />}
            {currentStep === 2 && <Step2Email />}
            {currentStep === 3 && <Step3AddService />}
            {currentStep === 4 && (
              <Step4Confirm
                isFetching={isFetching}
                APIErrorMessage={APIErrorMessage}
                handleSubmit={handleSubmit}
              />
            )}
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
