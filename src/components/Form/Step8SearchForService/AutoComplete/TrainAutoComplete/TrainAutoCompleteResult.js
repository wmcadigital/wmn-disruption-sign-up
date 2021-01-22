import React from 'react';

const TrainAutoCompleteResult = (props) => {
  const { result, handleKeyDown, setStation } = props || {};
  // Destructure fields from result
  const { id, name, lines } = result;

  // Function to update the state with selected service
  const selectStation = () => {
    setStation({ id, name, lines });
  };

  // Return service with the above disruption logic, replace type and iconName with correct icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      title={name}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={handleKeyDown}
      onClick={selectStation}
    >
      <strong className="wmnds-col-1">{name}</strong>
    </li>
  );
};

export default TrainAutoCompleteResult;
