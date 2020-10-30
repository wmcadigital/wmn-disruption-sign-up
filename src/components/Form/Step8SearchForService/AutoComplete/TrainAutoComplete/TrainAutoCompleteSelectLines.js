import React from 'react';
import PropTypes from 'prop-types';

const TrainAutoCompleteSelectLines = ({ trainStations }) => {
  return (
    <div className="wmnds-col-1">
      <h4>Select a train line</h4>
      <p>
        Two train lines are available between University and Birmingham New Street train stations.
      </p>
      {trainStations.From.lines.map((line) => (
        <h3>{line}</h3>
      ))}
    </div>
  );
};

TrainAutoCompleteSelectLines.propTypes = {
  trainStations: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrainAutoCompleteSelectLines;
