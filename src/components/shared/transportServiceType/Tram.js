import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import style from './Tram.module.scss';

function Tram(props) {
  const { serviceNumber, routeName, handleRemove, showRemove } = props;
  const onClick = () => {
    handleRemove(serviceNumber);
  };
  return (
    <div className={`${style.serviceWrapper}`}>
      <div
        className={`wmnds-disruption-indicator-medium
        wmnds-col-auto wmnds-m-r-md`}
      >
        {serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{routeName}</strong>
      {showRemove && (
        <button
          type="button"
          className={style.removeBtn}
          onClick={() => {
            onClick();
          }}
        >
          <Icon iconName="general-cross" className={`general-cross ${style.closeIcon}`} />
        </button>
      )}
    </div>
  );
}
Tram.propTypes = {
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
  showRemove: PropTypes.bool
};

Tram.defaultProps = {
  handleRemove: () => {},
  showRemove: false
};

export default Tram;
