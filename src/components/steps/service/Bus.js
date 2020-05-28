import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import style from './Bus.module.scss';

function Bus(props) {
  const { serviceNumber, routeName } = props;

  return (
    <>
      <div
        className={`wmnds-disruption-indicator-medium
        wmnds-col-auto wmnds-m-r-md`}
      >
        {serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{routeName}</strong>
      <button type="button" className={style.removeBtn}>
        <Icon
          iconName="general-cross"
          className={`general-cross ${style.closeIcon}`}
        />
      </button>
    </>
  );
}
Bus.propTypes = {
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default Bus;
