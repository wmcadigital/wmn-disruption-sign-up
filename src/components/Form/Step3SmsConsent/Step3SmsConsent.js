import React, { useRef } from 'react';
// Import components
import InputCheckbox from 'components/shared/FormElements/Input/InputCheckbox';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import WarningText from 'components/shared/WarningText/WarningText';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useFormData from '../useFormData';

const Step3SmsConsent = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  // Check if it is an existing user
  const { ExistingUser } = useFormData();

  const message = (
    <p>
      This is not a way to&nbsp;
      <a
        href="https://www.wmnetwork.co.uk/get-in-touch/"
        target="_blank"
        title="Contact customer services"
        rel="noopener noreferrer"
      >
        contact customer services
      </a>
    </p>
  );

  // Labels used on inputs and for validation
  const checkBoxLabel = 'I confirm I give my informed consent to take part in the trial';

  // Logic used to validate the email field
  const checkboxValidation = register({
    required: 'Agree to terms and conditions before continue',
    validate: {
      shouldBeTrue: (val) => val === true || 'Agree to terms and conditions before continue',
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      {!ExistingUser && <SectionStepInfo section="Section 1 of 2" description="About you" />}

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset wmnds-col-1">
        <div className="wmnds-fe-fieldset__legend">
          <h2>About the text message alert trial</h2>
          <h4>Introduction</h4>
          <p>
            This trial is being run by West Midlands Network (WMN) to explore whether our customers
            would like to receive information about disruptions on the network through text message
            alerts.
          </p>
          <h4>Text message alerts</h4>
          <p>
            Text messages will be sent from ‘WM Network’ and are sent automatically when a
            disruption is entered into our systems.
          </p>
          <p>
            The text messages we send to you are free. We can’t read any replies you send to the
            text message alerts, however you may still be charged by your mobile network for doing
            so.
          </p>
          <div>
            <WarningText type="warning" message={message} className="wmnds-m-b-md" />
          </div>

          <p>
            We’ll occasionally send a text asking for feedback about the service. The message will
            include a link that will take you to a survey. We will use responses to improve the
            service.
          </p>
          <h4>End of the trial</h4>
          <p>
            At the end of the trial, we’ll text you to let you know you won’t receive any more text
            message alerts from us.
          </p>
          <p>We’ll also email you to let you know how the trial went.</p>
          <h4>Trial participation information</h4>
          <p>
            West Midlands Network is run by the West Midlands Combined Authority (WMCA) who is
            responsible for any information that you provide us. We ensure that this information
            will be processed in accordance with data protection legislation. We are committed to
            protecting your privacy and will use your personal information fairly.
          </p>
          <p>The items of personal data that we may ask for and store as part of this trial are:</p>
          <p>The personal data that we may collect about you as part of this trial are:</p>
          <ul>
            <li>Name</li>
            <li>Email</li>
            <li>Phone number</li>
          </ul>
          <p>
            We will keep your personal data for a maximum of 12 months. This is so that the
            information you provide in this trial may be reused for further improvements to our
            transport services.
          </p>
          <p>
            If you remain signed up to email alerts after the trial ends, the service keeps your
            details until you decide to unsubscribe from all alerts. You can do this through the
            ‘manage my preferences’ link at the bottom of email alerts.
          </p>

          <h4>Have a question for the team?</h4>
          <p>
            Please email the Design Team at{' '}
            <a href="mailto:UserTesting@wmca.org.uk">UserTesting@wmca.org.uk</a> if you have a
            question about this trial.
          </p>

          <h4>Your consent</h4>
          <p>
            By continuing, you are giving your informed consent to take part in the trial. You
            understand that you may remove yourself from the trial at any time. If you choose to
            remove yourself, we will delete your personal information from our research. However,
            any anonymous data provided by you during the trial will be used to improve our
            services.
          </p>
          <p>
            For further information on how we handle information/data, and your information rights
            visit our&nbsp;
            <a
              href="https://www.wmnetwork.co.uk/privacy-cookies-policy/"
              target="_blank"
              title="Privacy and Cookies policy"
              rel="noopener noreferrer"
            >
              Privacy and Cookies policy
            </a>
            .
          </p>
          <p>
            This research is being conducted by WMN in partnership with The Market Research Society
            (MRS). The MRS is the professional body for market and social researchers. This project
            is being conducted by an MRS Company Partner. You can verify this by calling MRS
            freephone 0800 975 9596 and giving the name of the organisation that interviewed you.
          </p>
        </div>

        <InputCheckbox
          name="SMSTerms"
          type="checkbox"
          fieldValidation={checkboxValidation}
          labelValue={checkBoxLabel}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton()}
    </form>
  );
};

export default Step3SmsConsent;
