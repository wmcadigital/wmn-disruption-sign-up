import React from 'react';
// import { AutoCompleteContext } from 'globalState';
// Import components
// Import styles

const BusAutoCompleteResult = (props) => {
  const { result, handleKeyDown } = props || {};
  const updateSelectedService = () => {
    // Reset selected disruption ID from map (if any)
    console.log('updating');
  };
  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      title={result.serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      {/* Right section */}
      <strong className="wmnds-col-auto">{result.routes[0].routeName}</strong>
    </li>
  );
};

export default BusAutoCompleteResult;
