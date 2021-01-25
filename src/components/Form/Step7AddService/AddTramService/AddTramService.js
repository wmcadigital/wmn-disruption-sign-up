import React from 'react';
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';
import useStepLogic from 'components/Form/useStepLogic';

const AddTramService = () => {
  const { formDataState, formDataDispatch, setStep } = useStepLogic();
  const { TramLines } = formDataState.formData;

  const handleRemoveTram = (route) => {
    const { From, To } = route;
    formDataDispatch({ type: 'REMOVE_TRAM', payload: { From, To } });
  };

  const handleAddTram = () => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: 'tram',
    });
    setStep(formDataState.currentStep + 1);
  };

  return (
    <>
      <h3 className="wmnds-p-t-md">Trams</h3>
      {/* Add tram service button */}
      <Button
        btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        onClick={handleAddTram}
        text="Add tram service"
        iconRight="general-expand"
      />
      {/* Show the tram services the user has added */}
      {TramLines && TramLines.length > 0 && (
        <>
          <h4 className="wmnds-m-b-sm wmnds-m-t-lg">Tram services that you want to add</h4>
          {TramLines.map((route) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveTram(route)}
                serviceNumber="MM1"
                mode="tram"
                routeName={`${route.From.name} to ${route.To.name}`}
                id={`${route.From.id}-${route.To.id}`}
                key={`${route.From.id}-${route.To.id}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default AddTramService;
