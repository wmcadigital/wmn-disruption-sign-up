import React, { useContext } from 'react';
import IntextStep from 'components/shared/In-textStep/In-textStep';
import InsetText from 'components/shared/InsetText/InsetText';
import { FormDataContext } from '../../../globalState/FormDataContext';

function Success() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { Phone, SMSAlert, EmailAlert } = formDataState.formData;

  const alignCenter = {
    textAlign: 'center',
  };

  let message, steps;
  if (Phone && SMSAlert === 'yes' && EmailAlert && EmailAlert === 'yes') {
    message =
      'You have successfully signed up to text message and email alerts';
    steps = [
      'We’ll send you an email asking to confirm your subscription.',
      'When you confirm your subscription, we’ll send a PIN code to your mobile phone number. The PIN code can take up to 5 minutes to arrive. You’ll also receive access to the disruption alerts dashboard. This is where you can manage your communication preferences.',
      'Confirm your mobile phone number in the disruption alerts dashboard by entering the PIN code sent to your mobile phone. If you do not confirm your mobile number by midnight, you’ll need to request a new PIN code through the dashboard. You’ll need to confirm your mobile number before you can receive text message disruption alerts. ',
    ];
  } else if (Phone && SMSAlert === 'yes') {
    message = 'You have successfully signed up to text message alerts';
    steps = [
      'We’ll send an email asking to confirm your subscription to text message alerts.',
      'When you confirm your subscription, we’ll send a PIN code to your mobile phone number. The PIN code can take up to 5 minutes to arrive. You’ll also receive access to the disruption alerts dashboard. This is where you can manage your communication preferences.',
      'Confirm your mobile phone number in the disruption alerts dashboard by entering the PIN code sent to your mobile phone. If you do not confirm your mobile number by midnight, you’ll need to request a new PIN code through the dashboard. You’ll need to confirm your mobile number before you can receive text message disruption alerts. ',
    ];
  } else if (!Phone) {
    message = 'You have successfully signed up to email alerts';
    steps = [
      'We’ll send you an email asking to confirm your subscription.',
      'When you confirm your subscription, you’ll receive access to the disruption alerts dashboard. This is where you can manage your communication preferences.',
    ];
  }

  return (
    <div className="wmnds-container-alerts-sign-up">
      <div className="wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-lg-2-3">
          <h1>Sign up to service disruption alerts</h1>
        </div>
        <div className="wmnds-col-1 wmnds-col-lg-2-3 wmnds-m-b-xl">
          <div
            style={alignCenter}
            className="wmnds-msg-summary wmnds-msg-summary--success-fill "
          >
            <div className="wmnds-msg-summary__header">
              <h3 className="wmnds-msg-summary__title">{message}</h3>
            </div>
          </div>
        </div>

        <div className="wmnds-col-1 wmnds-col-lg-3-5">
          <p>
            We have sent you an email asking you to confirm your subscription.
          </p>
          <h3>What happens next</h3>
          <IntextStep steps={steps} />
          <InsetText
            classes="wmnds-m-b-lg"
            content="You can access your disruption alerts dashboard at any time by visiting the link in your confirmation email."
          />

          <p>
            To unsubscribe from all disruption alerts, please select the
            ‘Unsubscribe from alerts’ option in the disruption alerts dashboard.
          </p>

          <p>
            <a
              href="https://surveys.hotjar.com/s?siteId=264586&surveyId=158470"
              title="Service feedback survey"
              target="_blank"
              className="wmds-link"
              rel="noopener noreferrer"
            >
              What did you think of this service?
            </a>{' '}
            (takes 30 seconds)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Success;