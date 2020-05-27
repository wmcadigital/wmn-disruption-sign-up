import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';

function Bus(props) {
  const { serviceNumber, routeName } = props;
  const style = {
    width: '22px',
    height: '22px',
    fill: '#9d5baf',
  };
  return (
    <>
      <div
        className="
wmnds-disruption-indicator-medium
wmnds-col-auto wmnds-m-r-md 
"
      >
        {serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{routeName}</strong>
      <button type="button">
        <Icon iconName="general-cross" iconClass="general-cross" />
      </button>
    </>
  );
}
Bus.propTypes = {
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default Bus;
