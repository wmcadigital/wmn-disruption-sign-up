import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon/Icon';
import s from './SelectedTrainStation.module.scss';

const SelectedTrainStation = ({ selectedService }) => {
  return (
    <>
      {/* Close disruption box */}
      <div
        className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
      >
        <strong className={`wmnds-col-auto ${s.selectedSummary}`}>{selectedService.name}</strong>

        <button type="button" className={s.closeButton} onClick={() => {}}>
          <Icon iconName="general-cross" className={`general-cross ${s.closeIcon}`} />
        </button>
      </div>
    </>
  );
};

// PropTypes
SelectedTrainStation.propTypes = {
  selectedService: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SelectedTrainStation;
