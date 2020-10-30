/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const TrainAutoCompleteSelectLines = ({ trainStations }) => {
  const [selectedLines, setSelectedLines] = useState();

  return (
    <div className="wmnds-col-1">
      <h4>Select a train line</h4>
      <p>
        Two train lines are available between University and Birmingham New Street train stations.
      </p>
      <div className="wmnds-fe-group">
        <fieldset className="wmnds-fe-fieldset">
          {trainStations.From.lines.map((line) => (
            <>
              <label className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
                {/* Left side (service number and route name) */}
                <div className="wmnds-disruption-indicator-medium wmnds-m-r-md wmnds-col-auto">
                  {line}
                </div>

                <div className="wmnds-fe-checkboxes__container wmnds-m-b-none">
                  {/* Right side for remove service button */}
                  <input className="wmnds-fe-checkboxes__input" value="" type="checkbox" />

                  <span className="wmnds-fe-checkboxes__checkmark">
                    <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
                  </span>
                </div>
              </label>
              <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
            </>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

TrainAutoCompleteSelectLines.propTypes = {
  trainStations: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrainAutoCompleteSelectLines;
