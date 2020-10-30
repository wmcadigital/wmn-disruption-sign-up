import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import style from './Bus.module.scss';

const Bus = (props) => {
  const { id, serviceNumber, routeName, handleRemove, showRemove } = props;
  const onClick = () => {
    handleRemove(id);
  };
  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className="wmnds-col-1 wmnds-col-sm-3-5 wmnds-col-lg-3-5 wmnds-grid wmnds-m-t-sm wmnds-grid--align-center">
          <div className="wmnds-disruption-indicator-medium wmnds-m-r-md wmnds-col-auto">
            {serviceNumber}
          </div>
          <div className="wmnds-col-2-3">
            <strong>{routeName}</strong>
          </div>
        </div>
        {/* Right side for remove service button */}
        {showRemove && (
          <div className="wmnds-col-1 wmnds-col-sm-2-5 wmnds-col-lg-auto wmnds-grid wmnds-m-t-sm wmnds-grid--align-center wmnds-grid--justify-end">
            <Button
              btnClass={`wmnds-btn--destructive wmnds-col-1 wmnds-col-lg-auto wmnds-m-t-sm ${style.removeRoute}`}
              text="Remove service"
              iconRight="general-trash"
              title={`Remove service ${serviceNumber}: ${routeName}`}
              onClick={() => {
                onClick();
              }}
            />
          </div>
        )}
      </div>
      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

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
