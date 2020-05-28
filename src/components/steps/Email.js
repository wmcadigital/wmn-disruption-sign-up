import React from 'react';
import { useForm } from 'react-hook-form';

function Email({setCurrentStep}) {
  const { handleSubmit, register, errors } = useForm({ mode: 'onBlur' });
  const onSubmit = () => {
    setCurrentStep('AddService');
  }
  return (
    <>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">What is your email address?</h3>
          <p>We’ll automatically send disruption alerts to this address</p>
        </legend>
        {/* wmnds-fe-group--error */}
        <div
          className={`wmnds-fe-groupp ${
            errors.Email ? 'wmnds-fe-group--error' : ''
          }`}
        >
          <label className="wmnds-fe-label" htmlFor="FirstName">
            Email address, for example name@example.com
          </label>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <input
              ref={register({
                required: 'Enter yor email address',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address',
                },
              })}
              className={`wmnds-fe-input ${
                errors.Email ? 'wmnds-fe-input--error' : ''
              }`}
              id="Email"
              name="Email"
              type="text"
              inputMode="text"
              spellCheck="false"
            />
            {errors.Email && (
              <span className="wmnds-fe-error-message">
                {errors.Email.message}
              </span>
            )}
          </div>
        </div>
      </fieldset>
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={handleSubmit(onSubmit)}
      >
        Continue
      </button>
    </>
  );
}

export default Email;
