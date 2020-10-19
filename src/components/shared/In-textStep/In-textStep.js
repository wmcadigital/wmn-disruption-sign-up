import React from 'react';
import PropTypes from 'prop-types';

function IntextStep(props) {
  const { steps } = props;

  return (
    <ol className="wmnds-in-text-step">
      {steps.map((step) => {
        return (
          <li className="wmnds-in-text-step__item" key={step.index}>
            {step.value}
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
