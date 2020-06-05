/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
// Import custom hooks
import useStepLogic from '../useStepLogic';

import SectionStepInfo from '../../steps/SectionStepInfo';

const Step1Name = () => {
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef);
  const { errors } = useFormContext();
  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      <SectionStepInfo section="Section 1 of 2" description="About you" />
      {showGenericError}
      <fieldset className="wmnds-fe-fieldset wmnds-m-b-xl">
        <legend className="wmnds-fe-fieldset__legend wmnds-col-1">
          <h2>What is your name?</h2>
          <p>
            We’ll use this information to personalise your email
            <br /> notifications so they aren’t marked as spam.
          </p>
        </legend>
        {/* wmnds-fe-group--error */}
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <div
            className={`wmnds-fe-groupp ${
              errors.FirstName ? 'wmnds-fe-group--error' : ''
            }`}
          >
            <label className="wmnds-fe-label" htmlFor="FirstName">
              First Name
            </label>
            {errors.FirstName && (
              <span className="wmnds-fe-error-message">
                Enter your first name 123
              </span>
            )}
            <div className="wmnds-m-b-lg">
              <input
                ref={register({ required: true, maxLength: 20 })}
                className={`wmnds-fe-input ${
                  errors.FirstName ? 'wmnds-fe-input--error' : ''
                }`}
                id="FirstName"
                name="FirstName"
                type="text"
                inputMode="text"
                spellCheck="false"
              />
            </div>
          </div>
          <div
            className={`wmnds-fe-groupp ${
              errors.LastName ? 'wmnds-fe-group--error' : ''
            }`}
          >
            <label className="wmnds-fe-label" htmlFor="LastName">
              Last Name
            </label>
            {errors.LastName && (
              <span className="wmnds-fe-error-message">
                Enter your last name
              </span>
            )}
            <div className="">
              <input
                ref={register({ required: true, maxLength: 20 })}
                className={`wmnds-fe-input ${
                  errors.LastName ? 'wmnds-fe-input--error' : ''
                }`}
                id="LastName"
                name="LastName"
                type="text"
                inputMode="text"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </fieldset>
      {continueButton}
    </form>
  );
};

export default Step1Name;
