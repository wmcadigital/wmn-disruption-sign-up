import React, { useContext } from 'react';
import { FormDataContext } from '../../globalState/FormDataContext';

const AutoCompleteResult = (props) => {
  const { result, handleKeyDown, type, handleCancel } = props || {};
  const [formState, formDispatch] = useContext(FormDataContext);
  const updateSelectedService = (serviceId, routeName, serviceNumber) => {
    const shouldUpdate = formState[type].indexOf(serviceId) < 0;
    if (shouldUpdate) {
      const dispatchName = `SET_SERVICES_${type.toUpperCase()}`;
      formDispatch({
        type: dispatchName,
        payload: { serviceId, routeName, serviceNumber },
      });
      handleCancel();
    }
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
      onClick={() =>
        updateSelectedService(
          result.id,
          result.routes[0].routeName,
          result.serviceNumber
        )
      }
    >
      {/* Right section */}
      <div
        className="
        wmnds-disruption-indicator-medium
        wmnds-col-auto wmnds-m-r-md
        "
      >
        {result.serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{result.routes[0].routeName}</strong>
    </li>
  );
};

export default AutoCompleteResult;
