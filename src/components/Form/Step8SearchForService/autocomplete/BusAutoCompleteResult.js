import React, { useContext } from 'react';
import { FormDataContext } from 'globalState/FormDataContext';

const BusAutoCompleteResult = (props) => {
  const { result, handleKeyDown, handleCancel } = props || {};
  const [formState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formState;

  const updateSelectedService = (busResult) => {
    const { routeName } = busResult.routes[0];
    const { serviceNumber, id } = busResult;
    const TramService = formState.formData.TramServices || [];
    const BusService = formState.formData.BusServices || [];
    const BusServiceUpdated = [...BusService, { id, routeName, serviceNumber }];
    const AllServicesUpdated = [
      ...BusService,
      ...TramService,
      { id, routeName, serviceNumber },
    ];
    const allServicesId = [];
    AllServicesUpdated.map((single) => {
      return allServicesId.push(single.id);
    });

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { LineId: allServicesId, BusServices: BusServiceUpdated },
    });

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: currentStep - 1,
    });

    handleCancel();
  };
  // Return service with the above disruption logic, replace type and iconName with correct icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid wmnds-grid--align-center"
      title={result.serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService(result)}
    >
      {/* Right section */}
      <div className="wmnds-col-auto">
        <div
          className="
          wmnds-disruption-indicator-medium
          wmnds-col-auto 
          "
        >
          {result.serviceNumber}
        </div>
      </div>
      <div className="wmnds-col-3-4 wmnds-col-lg-4-5">
        <strong>{result.routes[0].routeName}</strong>
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
