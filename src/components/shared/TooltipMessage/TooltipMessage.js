import React from 'react';
import PropTypes from 'prop-types';
// Import styling
import s from './TooltipMessage.module.scss';

const TooltipMessage = ({ text }) => {
  return (
    <div className={`wmnds-col-1 wmnds-p-md wmnds-m-b-md ${s.tooltipMessage}`}>
      {text}
    </div>
  );
};

TooltipMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TooltipMessage;
