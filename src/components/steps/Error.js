import React from 'react';

function Error() {
  const alignCenter = {
    textAlign: 'center',
  };
  return (
    <div className="wmnds-container-alerts-sign-up">
      <div className="wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-sm-2-3">
          <h1>Sign up to email alerts about disruptions</h1>
        </div>
        {/* <div className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-m-b-xl">
          <div
            style={alignCenter}
            className="wmnds-msg-summary wmnds-msg-summary--error "
          >
            <div className="wmnds-msg-summary__header">
              <h3 className="wmnds-msg-summary__title">Sign up error</h3>
            </div>
          </div>
        </div> */}
        <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
          {/* Error message */}
          <h3>Sorry, there is a problem with this service</h3>
          <p>Try again later.</p>
          <p>
            We have not saved your answers. When the service is available, you
            will have to start again.
          </p>
          <p>
            Contact the{' '}
            <a
              href="https://www.wmnetwork.co.uk/get-in-touch/contact-us/?utm_source=service&utm_medium=errorpage&utm_campaign=covid-dd"
              title="Customer Services Team Contact Details"
              target="_self"
              className="wmnds-link"
            >
              Customer Services team
            </a>{' '}
            if you continue to have problems.
          </p>
        </div>

        {/* <div className="wmnds-col-1 wmnds-col-sm-3-5">
          <h3>Sorry, there is a problem with this service</h3>
          <p>Try again later.</p>
          <p>
            We have not saved your answers. When the service is available, you
            will have to start again.
          </p>
          <p>
            Contact the{' '}
            <a
              href="https://www.wmnetwork.co.uk/get-in-touch/contact-us/"
              title="Customer Services Team Contact Details"
              target="_self"
              className="wmnds-link"
            >
              Customer Services team
            </a>{' '}
            if you continue to have problems.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Error;
