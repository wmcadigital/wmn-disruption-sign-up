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
    TramLines,
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

  return (
    <>
      <div className={`wmnds-col-1 ${style.summary}`}>
        <h2>{title}</h2>
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
                      mode="bus"
                      serviceNumber={busRoute.serviceNumber}
                      routeName={busRoute.routeName}
                      key={`${busRoute.id}`}
                      showRemove={false}
                    />
                  );
                })}
              </div>
            )}

            {/* Trams */}
            {TramLines && TramLines.length > 0 && (
              <div className="wmnds-m-b-lg">
                <h4>Trams</h4>
                {TramLines.map((route) => {
                  return (
                    <RemoveService
                      mode="tram"
                      id={`${route.From.id}-${route.To.id}`}
                      serviceNumber="MM1"
                      routeName={`${route.From.name} to ${route.To.name}`}
                      key={`${route.From.id}-${route.To.id}`}
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
