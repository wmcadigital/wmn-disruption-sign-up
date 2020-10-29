import React from 'react';
import PropTypes from 'prop-types';
import Icon from './shared/Icon/Icon';

const Intro = ({ setIsFormStarted }) => {
  const handleClick = () => {
    setIsFormStarted(true);
  };
  return (
    <div className="wmnds-col-1 wmnds-col-md-2-3 wmnds-col-lg-1-2">
      <h1>Sign up to service disruptions alerts</h1>

      <div>
        <h2>Use this service to:</h2>
        <ul>
          <li>
            Sign up to automatic email alerts every time there is a disruption
            to your bus and/or tram services
          </li>
          <li>Sign up to our text message disruption alert trial</li>
        </ul>
        <p>This process takes around 5 minutes.</p>
        <br />
        <br />
        <button
          type="button"
          className="wmnds-btn wmnds-btn--start"
          onClick={handleClick}
        >
          Start now
          <Icon
            className="wmnds-btn__icon wmnds-btn__icon--right"
            iconName="general-chevron-right"
          />
        </button>
      </div>
    </div>
  );
};
Intro.propTypes = {
  setIsFormStarted: PropTypes.func.isRequired,
};
export default Intro;
