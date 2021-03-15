import React, { useRef, useState } from 'react';
import axios from 'axios';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import Button from 'components/shared/Button/Button';
// Helper
import { setSearchParam } from 'helpers/URLSearchParams';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useFormData from '../useFormData';

const Step5Email = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton, setStep } = useStepLogic(
    formRef
  ); // Custom hook for handling continue button (validation, errors etc)

  const [checkingEmail, setcheckingEmail] = useState(false);

  const goToRequestLinkStep = () => {
    setStep(0);
    setSearchParam('requestLink', true);
  };

  // Labels used on inputs and for validation
  const emailLabel = 'Email address';
  // Logic used to validate the email field
  const emailRegex = /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server
  // To show in case of the entered email is not registered.

  // Function to check if email address has already registered
  const checkEmailAddress = async (value) => {
    setcheckingEmail(true); // Set checking email to true so continue button shows loading spinner

    try {
      // Try hitting email checking API
      // if (!checkingEmail)
      await axios({
        url: '/personinfo',
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'post',
        data: JSON.stringify({ Email: value, sitecode: 'any text' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setcheckingEmail(false); // Set checking to false to remove loading spinner from continue button
      return false; // If successful (email found on system already) return false so our validation pipes to the error message
    } catch (error) {
      // console.log({ error: error.response.status });
      // eslint-disable-next-line no-console
      if (error.response.status !== 400) console.error({ error }); // log any errors, if not an error 400 (error 400 means the email address hasn't been registered yet - so it's technically a success)
      setcheckingEmail(false); // Set checking to false to remove loading spinner from continue button
      return true; // If successful (email NOT found on system already) return true so our validation doesn't pipe to the error message
    }
  };

  const ErrorMessage = (
    <p>
      <span className="wmnds-fe-error-message">This email address already exists</span>
      <span>
        If you&apos;ve lost the link to manage your disruption alerts,{' '}
        <Button
          title="Request a new link"
          btnClass="wmnds-btn--link"
          text="you can request a new one"
          type="button"
          onClick={goToRequestLinkStep}
        />
      </span>
    </p>
  );
  const emailValidation = register({
    required: `${emailLabel} is required`,
    pattern: {
      value: emailRegex,
      message: `Enter an ${emailLabel.toLowerCase()} in the correct format`,
    },
    validate: async (value) => (await checkEmailAddress(value)) || ErrorMessage, // Check if email exists, if false is returned (email exists), then pipe/show error message
  });

  // Check if user is in the trial
  const { SMSAlert } = useFormData();
  let text;
  if (SMSAlert) {
    text = (
      <p>
        We need your email address so you can confirm your subscription and manage your alert
        preferences.
      </p>
    );
  } else {
    text = (
      <>
        <p>We’ll automatically send disruption alerts to this address.</p>
        <p>
          We also need your email address so you can confirm your subscription and manage your alert
          preferences.
        </p>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your email address?</h2>
          {text}
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-lg-3-4"
          name="Email"
          label={`${emailLabel}, for example name@example.com`}
          type="email"
          autocomplete="email"
          fieldValidation={emailValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton(checkingEmail)}
    </form>
  );
};

export default Step5Email;
