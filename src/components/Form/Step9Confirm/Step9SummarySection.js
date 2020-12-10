import React, { useContext } from 'react';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Table from 'components/shared/Table/Table';
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

  /* Table Data */
  const dataLine1 = [];
  dataLine1.push(<span>Name</span>);
  dataLine1.push(<span>{`${Firstname} ${LastName}`}</span>);
  dataLine1.push(
    !ExistingUser ? (
      <button
        type="button"
        className={`${style.asLink} wmnds-link`}
        onClick={() => {
          setStepInContext(1);
        }}
      >
        Change
      </button>
    ) : null
  );

  const dataLine2 = [];
  dataLine2.push(<span>Email</span>);
  dataLine2.push(<span>{Email}</span>);
  dataLine2.push(
    !ExistingUser ? (
      <button
        type="button"
        className={`${style.asLink} wmnds-link`}
        onClick={() => {
          setStepInContext(5);
        }}
      >
        Change
      </button>
    ) : null
  );

  const dataLine3 = [];
  if (Phone) {
    dataLine3.push(<span>Mobile phone number</span>);
    dataLine3.push(<span>{Phone}</span>);
    dataLine3.push(
      <button
        type="button"
        className={`${style.asLink} wmnds-link`}
        onClick={() => {
          setStepInContext(4);
        }}
      >
        Change
      </button>
    );
  }
  /* End of Table Data */

  const data = [dataLine1, dataLine2];
  if (Phone) {
    data.push(dataLine3);
  }

  return (
    <>
      <div className={`wmnds-col-1 ${style.summary}`}>
        <h2>{title}</h2>
        <Table
          title="Personal Details"
          classes=""
          cellClasses={['', '', 'wmnds-text-align-right wmnds-p-r-none']}
          headers={[]}
          values={data}
          data-private
        />

        {!ExistingUser && (
          <>
            <div
              className={`wmnds-m-b-lg wmnds-m-t-xl wmnds-grid wmnds-grid--justify-between ${style.serviceAdded}`}
            >
              <h3 className="wmnds-col-2-3">Services added</h3>
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
            {TramServices && TramServices.length > 0 && (
              <div className="wmnds-m-b-lg">
                <h4>Trams</h4>
                {TramServices.map((tramRoute) => {
                  return (
                    <RemoveService
                      mode="tram"
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
