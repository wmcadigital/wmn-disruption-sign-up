import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import Icon from './shared/Icon/Icon';

const { sanitize } = dompurify;

function Message({ type, title, message }) {
  let iconName;
  switch (type) {
    case 'error':
      iconName = 'warning-triangle';
      break;

    default:
      iconName = 'success';
      break;
  }

  return (
    <div className={`wmnds-msg-summary wmnds-msg-summary--${type} wmnds-col-1 wmnds-m-t-lg`}>
      <div className="wmnds-msg-summary__header">
        <Icon iconName={`general-${iconName}`} className="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>

      <div
        className="wmnds-msg-summary__info"
        dangerouslySetInnerHTML={{ __html: sanitize(message) }}
      />
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
