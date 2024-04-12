import React from 'react';
// Context
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';
import useStepLogic from 'components/Form/useStepLogic';

function AddBusService() {
  const { setStep, formDataState, formDataDispatch } = useStepLogic();

  const { BusServices } = formDataState.formData;

  const handleRemoveBus = (id) => {
    formDataDispatch({ type: 'REMOVE_BUS', payload: id });
  };

  const handleAddBus = () => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: 'bus',
    });
    setStep(formDataState.currentStep + 1);
  };

  return (
    <>
      <h3 className="wmnds-p-t-md">Buses</h3>
      {/* Add bus service button */}
      <Button
        btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        onClick={handleAddBus}
        text={`Add ${BusServices && BusServices.length > 0 ? 'another' : ''} bus service`}
        iconRight="general-expand"
      />
      {/* Show the bus services the user has added */}
      {BusServices && BusServices.length > 0 && (
        <>
          <h4 className="wmnds-m-b-sm wmnds-m-t-lg">Bus services that you want to add</h4>
          {BusServices.map((busRoute) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveBus(busRoute.id)}
                mode="bus"
                serviceNumber={busRoute.serviceNumber}
                routeName={busRoute.routeName}
                key={`${busRoute.id}`}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default AddBusService;
