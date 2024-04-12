import React from 'react';
import PropTypes from 'prop-types';
import { setSearchParam } from 'helpers/URLSearchParams';
// Import components
import Icon from './shared/Icon/Icon';
import Button from './shared/Button/Button';

function Intro({ setIsFormStarted, goToRecoverLinkStep }) {
  const handleClick = () => {
    setIsFormStarted(true);
  };

  const recoverLink = () => {
    setSearchParam('requestLink', true);
    goToRecoverLinkStep();
  };

  return (
    <div className="wmnds-col-1 wmnds-col-md-2-3">
      <h1>Sign up to service disruptions alerts</h1>
      <h2>Use this service to:</h2>
      <ul>
        <li>Sign up to automatic email and text message disruption alerts</li>
        <li>
          You&apos;ll get an alert every time there is a disruption to your bus, tram or train
          service
        </li>
      </ul>
      <p className="wmnds-m-b-none">This process takes around 5 minutes.</p>

      <button
        type="button"
        className="wmnds-btn wmnds-btn--start wmnds-m-t-xl wmnds-m-b-xl wmnds-col-1 wmnds-col-sm-auto"
        onClick={handleClick}
      >
        Start now
        <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-chevron-right" />
      </button>

      <p>
        If you&apos;ve lost the link to manage your disruption alerts, <br />
        <Button
          onClick={recoverLink}
          title="Request new link to manage your disruption alerts"
          btnClass="wmnds-btn--link"
          text="you can request a new one"
        />
      </p>
    </div>
  );
}
Intro.propTypes = {
  setIsFormStarted: PropTypes.func.isRequired,
  goToRecoverLinkStep: PropTypes.func.isRequired,
};
export default Intro;
