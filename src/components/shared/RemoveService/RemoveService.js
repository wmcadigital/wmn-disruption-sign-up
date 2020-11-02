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
          <div
            className={`wmnds-disruption-indicator-medium wmnds-m-r-sm wmnds-col-auto ${style[mode]}`}
          >
            {serviceNumber}
          </div>

          {routeName && <strong className="wmnds-col-auto">{routeName}</strong>}
        </div>

        {/* Right side for remove service button */}
        {showRemove && (
          <Button
            btnClass={`wmnds-btn--destructive wmnds-col-1 wmnds-col-sm-auto ${style.removeBtn}`}
            text={mode === 'train' ? 'Remove line' : 'Remove route'}
            iconRight="general-trash"
            title={`Remove ${serviceNumber}${mode !== 'train' ? `: ${routeName}` : ' line'}`}
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
  routeName: PropTypes.string,
  serviceNumber: PropTypes.string.isRequired,
  showRemove: PropTypes.bool,
};

RemoveService.defaultProps = {
  handleRemove: () => {},
  routeName: null,
  showRemove: false,
};

export default RemoveService;
