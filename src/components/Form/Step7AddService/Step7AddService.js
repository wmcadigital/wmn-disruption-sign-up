import React, { useContext } from 'react';
import Button from 'components/shared/Button/Button';
// import { getNodeText } from '@testing-library/react';
import { FormDataContext } from '../../../globalState/FormDataContext';
// Import components
import Bus from '../../shared/transportServiceType/Bus';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';

function Step7AddService() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { BusServices } = formDataState.formData;
  const { TramServices } = formDataState.formData;

  const handleRemoveBus = (id) => {
    formDataDispatch({ type: 'REMOVE_BUS', payload: id });
  };

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

  const getNextStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep + incrementAmount,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div className="">
        {/* Subsection */}
        <SectionStepInfo section="Section 2 of 2" description="Services" />
        <h2 className="wmnds-col-1 wmnds-col-lg-4-5">Add a service</h2>
        <p className="wmnds-col-1 wmnds-col-lg-4-5">
          We’ll send an automatic disruption alert for each service you add.
        </p>

        <h3>Buses</h3>
        {/* Add bus service button */}
        <Button
          btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1"
          onClick={() => {
            getNextStep(1);
          }}
          text={`Add ${
            BusServices && BusServices.length > 0 ? 'another' : ''
          } bus service`}
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

        <h3 className="wmnds-p-t-md">Trams</h3>
        {/* Add tram service button */}
        {(!TramServices || TramServices.length === 0) && (
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1"
            onClick={() => {
              addDirectlyAvailableTram();
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
                  <Bus
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

        {/* Continue button */}
        {((BusServices && BusServices.length > 0) ||
          (TramServices && TramServices.length > 0)) && (
          <Button
            btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-xl"
            type="submit"
            text="Continue"
            onClick={() => {
              getNextStep(2);
            }}
          />
        )}
      </div>
    </form>
  );
}

export default Step7AddService;
