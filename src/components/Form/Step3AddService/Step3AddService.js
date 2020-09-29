import React, { useContext } from 'react';
import Button from 'components/shared/Button/Button';
// import { getNodeText } from '@testing-library/react';
import { FormDataContext } from '../../../globalState/FormDataContext';
// Import components
import Bus from '../../shared/transportServiceType/Bus';
import Tram from '../../shared/transportServiceType/Tram';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';
import style from './Step3AddService.module.scss';

function Step3AddService() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { BusServices } = formDataState.formData;
  const { TramServices } = formDataState.formData;

  const handleRemove = (route) => {
    formDataDispatch({ type: 'REMOVE_ROUTE', payload: route });
  };

  const addDirectlyAvailableTram = () => {
    const defTram = {
      id: '4546',
      routeName: 'Wolverhampton - Birmingham',
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

  const handleRemoveTram = (route) => {
    formDataDispatch({ type: 'REMOVE_TRAM_ROUTE', payload: route });
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
      <div className="wmnds-col-1">
        {/* Subsection */}
        <SectionStepInfo section="Section 2 of 2" description="Services" />
        <h2 className="">Add a service</h2>
        <p className="wmnds-col-2-3">
          You can sign up to 10 services at a time.
        </p>
        <p className="wmnds-m-b-lg">
          You will receive an automatic email update for each disruption
        </p>

        {/* Show the bus and tram services the user has added */}
        {((BusServices && BusServices.length > 0) ||
          (TramServices && TramServices.length > 0)) && (
          <div className="wmnds-m-b-xl wmnds-p-b-lg">
            <h3>Services added</h3>

            {/* Show the bus services the user has added */}
            {BusServices && BusServices.length > 0 && (
              <>
                <h4 className="wmnds-m-b-none">Buses</h4>
                <div className="wmnds-m-b-lg">
                  {BusServices.map((busRoute) => {
                    return (
                      <Bus
                        showRemove
                        handleRemove={handleRemove}
                        serviceNumber={busRoute.serviceNumber}
                        routeName={busRoute.routeName}
                        key={`${busRoute.serviceNumber}`}
                      />
                    );
                  })}
                </div>
              </>
            )}

            {/* Show the tram services the user has added */}
            {TramServices && TramServices.length > 0 && (
              <>
                <h4 className="wmnds-m-b-none">Trams</h4>
                <div className="wmnds-m-b-lg">
                  {TramServices.map((tramRoute) => {
                    return (
                      <Tram
                        showRemove
                        handleRemove={handleRemoveTram}
                        serviceNumber={tramRoute.serviceNumber}
                        routeName={tramRoute.routeName}
                        key={`${tramRoute.serviceNumber}`}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        <div
          className={`wmnds-grid wmnds-grid--justify-between ${style.group_buttons}`}
        >
          {/* Add bus service button */}
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1 wmnds-col-md-1-2 wmnds-m-b-sm"
            onClick={() => {
              getNextStep(1);
            }}
            text={`Add ${BusServices ? 'another' : ''} bus service`}
            iconRight="general-expand"
          />
          <span className="wmnds-m-r-md wmnds-hide-mobile" />
          {/* Add tram service button */}
          {(!TramServices || TramServices.length === 0) && (
            <Button
              btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1 wmnds-col-md-1-2 wmnds-m-b-sm"
              onClick={() => {
                addDirectlyAvailableTram();
              }}
              text="Add tram service"
              iconRight="general-expand"
            />
          )}
        </div>

        {/* Continue button */}
        {((BusServices && BusServices.length > 0) ||
          (TramServices && TramServices.length > 0)) && (
          <Button
            btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md"
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

export default Step3AddService;
