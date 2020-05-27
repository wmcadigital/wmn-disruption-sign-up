/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';

const FullName = () => {
  const { handleSubmit, register, errors } = useForm({ mode: 'onBlur' });
  const onSubmit = (values) => console.log(values);

  return (
    <>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">What is your name?</h3>
          <p>
            We’ll use this information to personalise your email notifications
            so they aren’t marked as spam.
          </p>
        </legend>
        {/* wmnds-fe-group--error */}
        <div
          className={`wmnds-fe-groupp ${
            errors.FirstName  ? 'wmnds-fe-group--error' : ''
          }`}
        >
          <label className="wmnds-fe-label" htmlFor="FirstName">
            First Name
          </label>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
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
            {errors.FirstName && (
              <span className="wmnds-fe-error-message">
                Enter your first name
              </span>
            )}
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
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
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
            {errors.LastName && (
              <span className="wmnds-fe-error-message">
                Enter your last name
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
};

export default FullName;
