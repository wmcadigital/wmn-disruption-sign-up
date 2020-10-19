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
    Phone,
    BusServices,
    TramServices,
    ExistingUser,
  } = formDataState.formData;
  const setStepInContext = (st) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: st,
    });
  };

  let title;
  if (ExistingUser) {
    title =
      'Check your preferences before signing up to the text message service disruption trial';
  } else {
    title = 'Check your preferences before signing up to disruption alerts';
  }

  // Check if mobile phone has +44, if not, remove the 0 and add +44
  const updatePhone = (phoneNumber) => {
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { Phone: phoneNumber },
    });
  };
  if (Phone && Phone.substr(0, 1) === '0') {
    updatePhone(`+44${Phone.substr(1)}`);
  }

  return (
    <>
      <div className={`wmnds-col-1 ${style.summary}`}>
        <h2 className="wmnds-col-1 wmnds-col-1 wmnds-col-lg-4-5">{title}</h2>
        <h3>Personal Details</h3>

        <table className="wmnds-table wmnds-m-b-xl wmnds-table--without-header">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{`${Firstname} ${LastName}`}</td>
              <td className="wmnds-text-align-right wmnds-p-r-none">
                {!ExistingUser && (
                  <button
                    type="button"
                    className={`${style.asLink} wmnds-link`}
                    onClick={() => {
                      setStepInContext(1);
                    }}
                  >
                    Change
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{Email}</td>
              <td className="wmnds-text-align-right wmnds-p-r-none">
                {!ExistingUser && (
                  <button
                    type="button"
                    className={`${style.asLink} wmnds-link`}
                    onClick={() => {
                      setStepInContext(5);
                    }}
                  >
                    Change
                  </button>
                )}
              </td>
            </tr>
            {Phone && (
              <tr>
                <th scope="row">Mobile phone number</th>
                <td>{Phone}</td>
                <td className="wmnds-text-align-right wmnds-p-r-none">
                  <button
                    type="button"
                    className={`${style.asLink} wmnds-link`}
                    onClick={() => {
                      setStepInContext(4);
                    }}
                  >
                    Change
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!ExistingUser && (
          <>
            <div
              className={`wmnds-m-b-lg wmnds-m-t-xl wmnds-grid wmnds-grid--justify-between ${style.serviceAdded}`}
            >
              <h3 className="wmnds-col-1-3">Services added</h3>
              <button
                type="button"
                className={`${style.asLink} wmnds-link`}
                onClick={() => {
                  setStepInContext(7);
                }}
              >
                Change
              </button>
            </div>

            <div className={style.busses}>
              {BusServices && BusServices.length > 0 && <h4>Buses</h4>}
              {BusServices && BusServices.length > 0 && (
                <div
                  className={` ${BusServices.length > 0 ? 'wmnds-m-b-lg' : ''}`}
                >
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
                  className={` ${
                    TramServices.length > 0 ? 'wmnds-m-b-lg' : ''
                  }`}
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
          </>
        )}

        {ExistingUser && (
          <div className="wmnds-m-b-lg wmnds-m-t-xl">
            <h3 className="wmnds-col-1-3">Your services</h3>
            <p>
              You’ll receive text message alerts for the service disruptions you
              are currently subscribed to.
            </p>
            <p>
              You can add or remove your services in the disruption alerts
              dashboard.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Step9SummarySection;
