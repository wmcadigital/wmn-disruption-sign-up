import React, { useContext } from 'react';
import { FormDataContext } from 'globalState/FormDataContext';

const AutoCompleteResult = (props) => {
  const { result, handleKeyDown, handleCancel } = props || {};
  const [formState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formState;
  // const [bus, setBus] = useState(formState.formData.BusServices || []);
  const updateSelectedService = (busResult) => {
    const { routeName } = busResult.routes[0];
    const { serviceNumber, id } = busResult;
    const BusService = formState.formData.BusServices || [];
    const BusServicesUpdated = [
      ...BusService,
      { id, routeName, serviceNumber },
    ];
    const busServiceId = [];
    BusServicesUpdated.map((single) => {
      return busServiceId.push(single.id);
    });
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { LineId: busServiceId, BusServices: BusServicesUpdated },
    });
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: currentStep - 1,
    });
    handleCancel();
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
      onClick={() => updateSelectedService(result)}
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
