import React, { useContext } from 'react';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import Button from 'components/shared/Button/Button';
import Tram from 'components/shared/transportServiceType/Tram';

const AddTramService = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { TramServices } = formDataState.formData;

  const handleRemoveTram = (id) => {
    formDataDispatch({ type: 'REMOVE_TRAM', payload: id });
  };

  const addDirectlyAvailableTram = () => {
    const defTram = {
      id: '4546',
      routeName: 'Birmingham - Wolverhampton - Birmingham',
      serviceNumber: 'MM1',
    };

    const currentTrams = [defTram];
    const { LineId } = formDataState.formData;
    let allServicesId = [];

    if (LineId && LineId.length > 0) {
      allServicesId = [...LineId, 4546];
    } else {
      allServicesId = [4546];
    }

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { LineId: allServicesId, TramServices: currentTrams },
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
      <h3 className="wmnds-p-t-md">Trams</h3>
      {/* Add tram service button */}
      {(!TramServices || TramServices.length === 0) && (
        <Button
          btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1"
          onClick={() => {
            addDirectlyAvailableTram();
            updateMode('tram');
          }}
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
                <Tram
                  showRemove
                  handleRemove={handleRemoveTram}
                  serviceNumber={tramRoute.serviceNumber}
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
