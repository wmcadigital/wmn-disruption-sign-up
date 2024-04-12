import React, { useContext } from 'react';
import { FormDataContext } from 'globalState/FormDataContext';

function BusAutoCompleteResult(props) {
  const [formState, formDataDispatch] = useContext(FormDataContext); // Get state and dispatch of form
  const { result, handleKeyDown, handleCancel } = props || {};
  // Destructure fields from result
  const { routeName } = result.routes[0];
  const { serviceNumber, id } = result;

  // Function to update the state with selected service
  const updateSelectedService = () => {
    const { LineId, BusServices } = formState.formData; // Get existing LineId and BusServices in state
    // Update state with new selected service
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        LineId: [...LineId, id],
        BusServices: [...BusServices, { id, routeName, serviceNumber }],
      },
    });

    handleCancel(); // Passed in from parent (go back to previous step and set mode to null)
  };

  // Return service with the above disruption logic, replace type and iconName with correct icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid wmnds-grid--align-center"
      title={serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      {/* Right section */}
      <div className="wmnds-col-auto">
        <div
          className="
          wmnds-disruption-indicator-medium
          wmnds-col-auto
          "
        >
          {serviceNumber}
        </div>
      </div>
      <div className="wmnds-col-3-4 wmnds-col-lg-4-5">
        <strong>{routeName}</strong>
      </div>
    </li>
  );
}

export default BusAutoCompleteResult;
