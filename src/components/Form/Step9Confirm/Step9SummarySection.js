import React, { useContext } from 'react';
import { FormDataContext } from '../../../globalState/FormDataContext';
import Bus from '../../shared/transportServiceType/Bus';
import Tram from '../../shared/transportServiceType/Tram';

import style from './Step9Confirm.module.scss';

function Step9SummarySection() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const {
    Firstname,
    LastName,
    Email,
    BusServices,
    TramServices,
  } = formDataState.formData;
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

        <h3>Personal Details</h3>
        {/* TODO: needs to be replaced by table component */}
        <table className="wmnds-table wmnds-m-b-xl wmnds-table--without-header">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{`${Firstname} ${LastName}`}</td>
              <td className="wmnds-text-align-right wmnds-p-r-none">
                <button
                  type="button"
                  className={`${style.asLink} wmnds-link`}
                  onClick={() => {
                    setStepInContext(1);
                  }}
                >
                  Change
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Contact Details</th>
              <td>{Email}</td>
              <td className="wmnds-text-align-right wmnds-p-r-none">
                <button
                  type="button"
                  className={`${style.asLink} wmnds-link`}
                  onClick={() => {
                    setStepInContext(2);
                  }}
                >
                  Change
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* TODO: needs to be replaced by table component */}

        <div
          className={`wmnds-m-b-lg wmnds-m-t-xl wmnds-grid wmnds-grid--justify-between ${style.serviceAdded}`}
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
            <div className={` ${BusServices.length > 0 ? 'wmnds-m-b-lg' : ''}`}>
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

        <div className={style.busses}>
          {TramServices && TramServices.length > 0 && <h4>Trams</h4>}
          {TramServices && TramServices.length > 0 && (
            <div
              className={` ${TramServices.length > 0 ? 'wmnds-m-b-lg' : ''}`}
            >
              {TramServices &&
                TramServices.map((tramRoute) => {
                  return (
                    <Tram
                      serviceNumber={tramRoute.serviceNumber}
                      routeName={tramRoute.routeName}
                      key={`${tramRoute.serviceNumber}`}
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

export default Step9SummarySection;
