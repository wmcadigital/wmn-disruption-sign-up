import React, { useContext } from 'react';
import { FormDataContext } from 'globalState/FormDataContext';

const TrainAutoCompleteResult = (props) => {
  const [formState, formDataDispatch] = useContext(FormDataContext); // Get state and dispatch of form
  const { result, handleKeyDown, handleCancel, to } = props || {};
  // Destructure fields from result
  const { id, name } = result;

  // Function to update the state with selected service
  const updateSelectedService = () => {
    const { TrainServices } = formState.formData; // Get existing LineId and TrainServices in state
    // Update state with new selected service
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        TrainServices: [...TrainServices, { id, name }],
      },
    });

    handleCancel(); // Passed in from parent (go back to previous step and set mode to null)
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
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      <strong className="wmnds-col-1">{name}</strong>
    </li>
  );
};

export default TrainAutoCompleteResult;
