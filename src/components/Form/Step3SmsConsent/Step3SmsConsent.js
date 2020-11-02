import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import InputCheckbox from 'components/shared/FormElements/Input/InputCheckbox';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import useFormData from '../useFormData';

const Step3SmsConsent = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  // Check if it is an existing user
  const { ExistingUser } = useFormData();

  // Labels used on inputs and for validation
  const checkBoxLabel =
    'I confirm I give my informed consent to take part in the trial';

  // Logic used to validate the email field
  const checkboxValidation = register({
    required: 'Agree to terms and conditions before continue',
    validate: {
      shouldBeTrue: (val) =>
        val === true || 'Agree to terms and conditions before continue',
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      {!ExistingUser && (
        <SectionStepInfo section="Section 1 of 2" description="About you" />
      )}

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>About the text message alert trial</h2>
          <h4>Introduction</h4>
          <p>
            This trial is being run by West Midlands Combined Authority (WMCA).
            We are testing the demand for the service, so we can understand the
            cost of running the service permanently.
          </p>
          <h4>Text message alerts</h4>
          <p>
            Text messages will be sent from ‘WM Network’. Texts are sent
            automatically when a disruption is entered into our systems.
          </p>
          <p>
            Text messages we send to you are free. We can’t read any replies you
            send, and you might be charged by your mobile network.
          </p>
          <p>
            We’ll occasionally send a text asking for feedback about the
            service. We will link to a Hotjar survey and offer an incentive.
          </p>
          <h4>End of the trial</h4>
          <p>
            At the end of the trial, we’ll text you to let you know you won’t
            receive any more text message alerts from us.
          </p>
          <p>We’ll also email you to let you know how the trial went.</p>
          <h4>Research participation information</h4>
          <p>
            WMCA is responsible for any information that you provide us. We
            ensure that this information will be processed in accordance with
            data protection legislation. We are committed to protecting your
            privacy and will use your personal information fairly.
          </p>
          <p>
            The personal data that we may collect about you as part of this
            trial are:
          </p>
          <ul>
            <li>Name</li>
            <li>Email</li>
            <li>Phone number</li>
          </ul>
          <p>
            We will keep your personal data for a maximum of 12 months. This is
            so that the information you provide in this trial may be reused for
            further improvements to our transport services.
          </p>
          <p>
            If you remain signed up to email alerts after the trial ends, the
            service keeps your details until you decide to unsubscribe from all
            alerts. You can do this through the ‘manage my preferences’ link at
            the bottom of email alerts.
          </p>

          <h4>How you can make a complaint</h4>
          <p>
            Please email the Design Team at{' '}
            <a href="mailto:UserTesting@wmca.org.uk">UserTesting@wmca.org.uk</a>{' '}
            if you have a complaint about this trial.
          </p>

          <h4>Your consent</h4>
          <p>
            By continuing, you are giving your informed consent to take part in
            the trial. You understand that you may remove yourself from the
            trial at any time. If you choose to remove yourself, we will delete
            your personal information from our research. However, any anonymous
            data provided by you during the trial will be used to improve our
            services.
          </p>
          <p>
            For further information on how we handle information/data, and your
            information rights visit our Privacy and Cookies policy.
          </p>
          <p>
            This research has been conducted by WMN in partnership with The
            Market Research Society (MRS). The MRS is the professional body for
            market and social researchers. This project is being conducted by an
            MRS Company Partner. You can verify this by calling MRS freephone
            0800 975 9596 and giving the name of the organisation that
            interviewed you.
          </p>
        </legend>

        <InputCheckbox
          name="SMSTerms"
          type="checkbox"
          fieldValidation={checkboxValidation}
          labelValue={checkBoxLabel}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step3SmsConsent;