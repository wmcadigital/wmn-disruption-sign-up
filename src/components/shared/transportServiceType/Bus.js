import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import style from './Bus.module.scss';

function Bus(props) {
  const { id, serviceNumber, routeName, handleRemove, showRemove } = props;
  const onClick = () => {
    handleRemove(id);
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
      {/* Right side for remove route button */}
      {showRemove && (
        <Button
          btnClass={`wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto ${style.removeBtn}`}
          text="Remove service"
          iconRight="general-trash"
          title={`Remove service ${serviceNumber}: ${routeName}`}
          onClick={() => {
            onClick();
          }}
        />
      )}
    </div>
  );
}
Bus.propTypes = {
  id: PropTypes.string.isRequired,
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
  showRemove: PropTypes.bool,
};

Bus.defaultProps = {
  handleRemove: () => {},
  showRemove: false,
};

export default Bus;
