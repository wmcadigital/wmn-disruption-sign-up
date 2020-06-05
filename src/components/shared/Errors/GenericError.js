import React from 'react';
import Icon from '../Icon/Icon';

const GenericError = () => {
  return (
    <div className="wmnds-msg-summary wmnds-msg-summary--error wmnds-m-b-lg">
      <div className="wmnds-msg-summary__header">
        <Icon
          iconName="general-warning-triangle"
          className="wmnds-msg-summary__icon"
        />
        <h3 className="wmnds-msg-summary__title">There is a problem</h3>
      </div>

      <div className="wmnds-msg-summary__info">
        Please check your answers again.
      </div>
    </div>
  );
};

export default GenericError;
