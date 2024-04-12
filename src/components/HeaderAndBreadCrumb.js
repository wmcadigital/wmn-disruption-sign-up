/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

function HeaderAndBreadcrumb({ isFormStarted, formSubmitStatus }) {
  return (
    <>
      <header className="wmnds-header wmnds-header--mobile-app">
        <div className="wmnds-container wmnds-grid wmnds-grid--align-center wmnds-grid--justify-between">
          <div className="wmnds-header__vertical-align wmnds-col-auto">
            {/* <!-- Logo --> */}
            <a
              className="wmnds-header__logo-link"
              href="//tfwm.org.uk"
              title="West Midlands Network Home"
            >
              <img
                className="wmnds-header__logo"
                alt="West Midlands Network logo"
                src="//wmnetwork.netlify.com/img/logo.svg"
              />
            </a>
          </div>

          {/* Only show the title in the header if the form is started and we are not on success/error page (formSubmitStatus) */}
          {isFormStarted && formSubmitStatus === null && (
            <h1 className="wmnds-header__title wmnds-col-1 wmnds-col-sm-auto">
              Sign up to service disruptions alerts
            </h1>
          )}
        </div>
      </header>

      {/* <div className="wmnds-container">
        <div className="wmnds-banner-container">
          <div className="wmnds-col-1">
            <div className="wmnds-banner-container__phase-wrapper">
              <a
                href="/"
                target="_self"
                className="wmnds-phase-indicator"
                title="Beta homepage of West Midlands Network"
              >
                Beta
              </a>
            </div>
            <p className="wmnds-banner-container__text">
              This is a new service - your{' '}
              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=RetZCK7xCk6e-ubWa7tnL51Hn3Md47tLqr_OlQdqFgtUMTE0NURDUkE2NExFWDlJTVhTQUxGTEdSWC4u"
                title="Service feedback survey"
                target="_blank"
                className="wmnds-link"
                rel="noopener noreferrer"
              >
                feedback{' '}
              </a>
              will help us to improve it.
            </p>
          </div>
        </div>
      </div> */}

      {/* <!-- Breadcrumb --> */}
      {/* Only show breadcrumbs if the form isn't started or we are on success/error page (formSubmitStatus) */}
      {!isFormStarted ||
        (formSubmitStatus !== null && (
          <div className="wmnds-container">
            <nav
              aria-label="Breadcrumb"
              className="wmnds-breadcrumb wmnds-breadcrumb--mobile-app wmnds-col-1"
            >
              <ol className="wmnds-breadcrumb__list">
                <li className="wmnds-breadcrumb__list-item">
                  <a
                    href="https://wmnetwork.co.uk/plan-your-journey/"
                    className="wmnds-breadcrumb__link"
                  >
                    Plan a journey
                  </a>
                </li>
                <li className="wmnds-breadcrumb__list-item">
                  <a
                    href="https://wmnetwork.co.uk/plan-your-journey/disruptions/"
                    className="wmnds-breadcrumb__link"
                  >
                    Disruptions
                  </a>
                </li>
                <li className="wmnds-breadcrumb__list-item">
                  <a
                    href="/"
                    className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
                    aria-current="page"
                  >
                    Sign up to service disruption alerts
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        ))}
      {/* <!-- End Breadcrumb --> */}
    </>
  );
}

HeaderAndBreadcrumb.propTypes = {
  isFormStarted: PropTypes.bool.isRequired,
  formSubmitStatus: PropTypes.bool,
};

HeaderAndBreadcrumb.defaultProps = {
  formSubmitStatus: null,
};

export default HeaderAndBreadcrumb;
