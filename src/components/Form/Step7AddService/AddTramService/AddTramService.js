import React from 'react';
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';
import useStepLogic from 'components/Form/useStepLogic';

const AddTramService = () => {
  const { formDataState, formDataDispatch } = useStepLogic();
  const { TramServices } = formDataState.formData;

  const handleRemoveTram = (id) => {
    formDataDispatch({ type: 'REMOVE_TRAM', payload: id });
  };

  const handleAddTram = () => {
    const defTram = [
      {
        id: '4546',
        routeName: 'Birmingham - Wolverhampton - Birmingham',
        serviceNumber: 'MM1',
      },
    ];

    const { LineId } = formDataState.formData;

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { LineId: [...LineId, 4546], TramServices: defTram },
    });
  };

  return (
    <>
      <h3 className="wmnds-p-t-md">Trams</h3>
      {/* Add tram service button */}
      {(!TramServices || TramServices.length === 0) && (
        <Button
          btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1"
          onClick={handleAddTram}
          text="Add tram service"
          iconRight="general-expand"
        />
      )}

      {/* Show the tram services the user has added */}
      {TramServices && TramServices.length > 0 && (
        <>
          <h4>Tram services that you want to add</h4>
          <div className="wmnds-m-b-lg">
            {TramServices.map((tramRoute) => {
              return (
                <RemoveService
                  showRemove
                  onClick={() => handleRemoveTram(tramRoute.id)}
                  serviceNumber={tramRoute.serviceNumber}
                  mode="tram"
                  routeName={tramRoute.routeName}
                  id={tramRoute.id}
                  key={`${tramRoute.id}`}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AddTramService;
