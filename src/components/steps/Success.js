import React from 'react';

function Success() {
  const alignCenter = {
    textAlign: 'center',
  };
  return (
    <div className="wmnds-container-alerts-sign-up">
      <div className="wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-sm-2-3">
          <h1>Sign up to email alerts about disruptions</h1>
        </div>
        <div className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-m-b-xl">
          <div
            style={alignCenter}
            className="wmnds-msg-summary wmnds-msg-summary--success-fill "
          >
            <div className="wmnds-msg-summary__header">
              <h3 className="wmnds-msg-summary__title">Sign up successful</h3>
            </div>
          </div>
        </div>

        <div className="wmnds-col-1 wmnds-col-md-3-5">
          <p>
            We have sent you an email asking you to confirm your subscription.
          </p>
          <h3>What happens next</h3>
          <p>
            You need to confirm your subscription before you start to receive
            automatic alerts about disruption.
          </p>
          <p>
            You can unsubscribe at any time using the links in the footer of the
            email.
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
