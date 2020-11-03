import React, { useContext } from 'react';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
// Style
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
    Trains,
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
    title = 'Check your preferences before signing up to the text message service disruption trial';
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

            {/* Buses */}
            {BusServices && BusServices.length > 0 && (
              <div className="wmnds-m-b-lg">
                <h4>Buses</h4>
                {BusServices.map((busRoute) => {
                  return (
                    <RemoveService
                      id={busRoute.id}
                      mode="bus"
                      serviceNumber={busRoute.serviceNumber}
                      routeName={busRoute.routeName}
                      key={`${busRoute.serviceNumber}`}
                      showRemove={false}
                    />
                  );
                })}
              </div>
            )}

            {/* Trams */}
            {TramServices && TramServices.length > 0 && (
              <div className="wmnds-m-b-lg">
                <h4>Trams</h4>
                {TramServices.map((tramRoute) => {
                  return (
                    <RemoveService
                      mode="tram"
                      id={tramRoute.id}
                      serviceNumber={tramRoute.serviceNumber}
                      routeName={tramRoute.routeName}
                      key={`${tramRoute.serviceNumber}`}
                      showRemove={false}
                    />
                  );
                })}
              </div>
            )}

            {/* Trains */}
            {Trains && Trains.length > 0 && (
              <div className="wmnds-m-b-lg">
                <h4>Trains</h4>
                {Trains[0].LineIds.map((line) => {
                  return (
                    <RemoveService
                      mode="train"
                      serviceNumber={line}
                      id={line}
                      key={line}
                      showRemove={false}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}

        {ExistingUser && (
          <div className="wmnds-m-b-lg wmnds-m-t-xl">
            <h3 className="wmnds-col-1-3">Your services</h3>
            <p>
              You’ll receive text message alerts for the service disruptions you are currently
              subscribed to.
            </p>
            <p>You can add or remove your services in the disruption alerts dashboard.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Step9SummarySection;
