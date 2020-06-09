import React, { useContext } from 'react';
import { FormDataContext } from '../../../globalState/FormDataContext';
import Bus from '../../shared/transportServiceType/Bus';

import style from './Step4Confirm.module.scss';

function Step4SummarySection() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { Firstname, LastName, Email, BusServices } = formDataState.formData;
  const setStepInContext = (st) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: st,
    });
  };
  return (
    <>
      <div className={`wmnds-col-1 ${style.summary}`}>
        <h2>Check your answers before signing up to email alerts</h2>
        <ul className="wmnds-col-1">
          <li>You can sign up to as many services as you would like</li>
          <li>
            You will receive an automatic email update for each disruption
          </li>
        </ul>
        <h3>Personal details</h3>
        <div className="wmnds-grid wmnds-grid--justify-between">
          <div
            className={`wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
          >
            <div className="wmnds-col-1-3">
              <strong>Name</strong>
            </div>
            <div className="wmnds-col-1-3">{`${Firstname} ${LastName}`}</div>
            <div className="wmnds-col-1-3">
              <button
                type="button"
                className={`${style.asLink} wmnds-link`}
                onClick={() => {
                  setStepInContext(1);
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
        <div className="wmnds-grid wmnds-grid--justify-between">
          <div
            className={`wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
          >
            <div className="wmnds-col-1-3">
              <strong>Contact details</strong>
            </div>
            <div className="wmnds-col-1-3">{Email}</div>
            <div className="wmnds-col-1-3">
              <button
                type="button"
                className={`${style.asLink} wmnds-link`}
                onClick={() => {
                  setStepInContext(2);
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
        <div
          className={`wmnds-m-b-sm wmnds-m-t-xl wmnds-grid wmnds-grid--justify-between ${style.serviceAdded}`}
        >
          <h3 className="wmnds-col-1-3">Services added</h3>
          <button
            type="button"
            className={`${style.asLink} wmnds-link`}
            onClick={() => {
              setStepInContext(3);
            }}
          >
            Change
          </button>
        </div>

        <div className={style.busses}>
          {BusServices && BusServices.length > 0 && <h4>Buses</h4>}
          {BusServices && BusServices.length > 0 && (
            <div className={` ${BusServices.length > 0 ? 'wmnds-m-b-xl' : ''}`}>
              {BusServices &&
                BusServices.map((busRoute) => {
                  return (
                    <Bus
                      serviceNumber={busRoute.serviceNumber}
                      routeName={busRoute.routeName}
                      key={`${busRoute.serviceNumber}`}
                      showRemove={false}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Step4SummarySection;
