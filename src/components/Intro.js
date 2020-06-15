import React from 'react';
import Icon from './Icon-old';

const Intro = ({ setIsFormStarted }) => {
  const handleClick = () => {
    setIsFormStarted(true);
  };
  return (
    <>
      <h1 className="wmnds-col-1 wmnds-col-lg-3-4">
        Sign up to email alerts about disruption
      </h1>

      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        <h2>Use this service to:</h2>
        <ul>
          <li>
            Sign up to automatic email alerts every time there is a disruption
            to your bus or tram service
          </li>
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
    </>
  );
};

export default Intro;
