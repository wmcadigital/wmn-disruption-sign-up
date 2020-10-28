import React, { useContext } from 'react';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import Button from 'components/shared/Button/Button';
import Bus from 'components/shared/transportServiceType/Bus';

const AddBusService = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { BusServices } = formDataState.formData;

  const handleRemoveBus = (id) => {
    formDataDispatch({ type: 'REMOVE_BUS', payload: id });
  };

  const getNextStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep + incrementAmount,
    });
  };

  const updateMode = (mode) => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: mode,
    });
  };

  return (
    <>
      <h3>Buses</h3>
      {/* Add bus service button */}
      <Button
        btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1"
        onClick={() => {
          getNextStep(1);
          updateMode('bus');
        }}
        text={`Add ${BusServices && BusServices.length > 0 ? 'another' : ''} bus service`}
        iconRight="general-expand"
      />
      {/* Show the bus services the user has added */}
      {BusServices && BusServices.length > 0 && (
        <>
          <h4>Bus services that you want to add</h4>
          <div className="wmnds-m-b-lg">
            {BusServices.map((busRoute) => {
              return (
                <Bus
                  showRemove
                  handleRemove={handleRemoveBus}
                  serviceNumber={busRoute.serviceNumber}
                  routeName={busRoute.routeName}
                  id={busRoute.id}
                  key={`${busRoute.id}`}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AddBusService;
