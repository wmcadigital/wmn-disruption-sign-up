import React from 'react';
import PropTypes from 'prop-types';
import style from './RemoveService.module.scss';
import Button from '../Button/Button';

const RemoveService = ({ id, serviceNumber, routeName, handleRemove, showRemove, mode }) => {
  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
        {/* Left side (service number and route name) */}
        <div className={`${style.leftWrap} wmnds-grid wmnds-grid--align-center`}>
          <div className="wmnds-disruption-indicator-medium wmnds-m-r-sm wmnds-col-auto">
            {serviceNumber}
          </div>

          <strong className="wmnds-col-auto">{routeName}</strong>
        </div>

        {/* Right side for remove service button */}
        {showRemove && (
          <Button
            btnClass={`wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto ${style.removeRoute}`}
            text="Remove service"
            iconRight="general-trash"
            title={`Remove service ${serviceNumber}: ${routeName}`}
            onClick={handleRemove}
          />
        )}
      </div>
      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
};

RemoveService.propTypes = {
  id: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
  mode: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  serviceNumber: PropTypes.string.isRequired,
  showRemove: PropTypes.bool,
};

RemoveService.defaultProps = {
  handleRemove: () => {},
  showRemove: false,
};

export default RemoveService;
