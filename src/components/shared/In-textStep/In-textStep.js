import React from 'react';
import PropTypes from 'prop-types';

function IntextStep(props) {
  const { steps } = props;

  return (
    <ol className="wmnds-in-text-step">
      {steps.map((value, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li className="wmnds-in-text-step__item" key={`step${index}`}>
            {value}
          </li>
        );
      })}
    </ol>
  );
}

IntextStep.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IntextStep;
