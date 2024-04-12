import React, { useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// State
import { FormDataContext } from 'globalState/FormDataContext';
// Import custom hooks
import useSubmitLinkRecovery from 'components/Form/useSubmitLinkRecovery';
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';

function Step0Recovery({ setFormSubmitStatus }) {
  const [, formDataDispatch] = useContext(FormDataContext);
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { handleSubmit, isFetching, APIErrorMessage } = useSubmitLinkRecovery(setFormSubmitStatus);
  // Labels used on inputs and for validation
  const emailLabel = 'Email address';
  // Logic used to validate the email field
  const emailRegex =
    /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server
  const emailValidation = register({
    required: `${emailLabel} is required`,
    pattern: {
      value: emailRegex,
      message: `Enter an ${emailLabel.toLowerCase()} in the correct format`,
    },
  });

  // Set the isRequestingRecovery param in globalstate
  useEffect(() => {
    formDataDispatch({ type: 'REACHED_RECOVERY', payload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // To show in case of the entered email is not registered.
  const ErrorMessage = (
    <p>
      <span className="wmnds-fe-error-message">This email address does not exist</span>
      <span>
        Please check that you’ve entered the correct email address. Otherwise, you’ll need to{' '}
        <a href="/" target="_self" title="Sign up as a new user">
          sign up as a new user
        </a>
      </span>
    </p>
  );

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {APIErrorMessage &&
        APIErrorMessage !== "this email hasn't been registered" &&
        isFetching === false && (
          <Message
            type="error"
            title="Please try again"
            message="Apologies, we are experiencing technical difficulties"
            className="wmnds-m-b-md"
          />
        )}
      {APIErrorMessage &&
        APIErrorMessage === "this email hasn't been registered" &&
        isFetching === false && (
          <Message
            type="error"
            title="This email address does not exist"
            message="Please check that you’ve entered the correct email address."
            className="wmnds-m-b-md"
          />
        )}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">Request a link to manage your disruption alerts</h2>
          <p>
            We will send you a link where you can manage your disruption alerts to the same email
            address you signed up with.
          </p>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-3-4"
          name="RecoveryEmail"
          label={`${emailLabel}, for example name@example.com`}
          type="email"
          autocomplete="email"
          fieldValidation={emailValidation}
          APIerrors={APIErrorMessage && isFetching === false ? ErrorMessage : null}
        />
      </fieldset>

      {/* Submit button */}
      <Button
        btnClass="wmnds-btn--start wmnds-col-1 wmnds-col-sm-auto"
        disabled={isFetching}
        iconRight="general-chevron-right"
        isFetching={isFetching}
        type="submit"
        text="Request link"
      />
    </form>
  );
}

Step0Recovery.propTypes = {
  setFormSubmitStatus: PropTypes.func.isRequired,
};

export default Step0Recovery;
