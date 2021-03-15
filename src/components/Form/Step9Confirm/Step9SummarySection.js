import React, { useContext } from 'react';
// Hooks
import useSelectableTramLines from 'components/Form/useSelectableTramLines';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Table from 'components/shared/Table/Table';

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
    LineId,
    ExistingUser,
  } = formDataState.formData;
  const { filterTramLineInfo } = useSelectableTramLines();

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
        className="wmnds-btn wmnds-btn--link"
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
        className="wmnds-btn wmnds-btn--link"
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
        className="wmnds-btn wmnds-btn--link"
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
      <div className="wmnds-col-1">
        <h2 className="wmnds-fe-question">{title}</h2>
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
            <div className="wmnds-m-b-lg wmnds-m-t-xl wmnds-grid wmnds-grid--justify-between">
              <h3 className="wmnds-col-2-3">Services added</h3>
              <button
                type="button"
                className="wmnds-btn wmnds-btn--link"
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
            {((TramLines && TramLines.length > 0) || filterTramLineInfo(LineId).length) && (
              <div className="wmnds-m-b-lg">
                <h4>Trams</h4>
                {/* Stop by stop */}
                {TramLines.length > 0 &&
                  TramLines.map((route) => {
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
                {/* Full line */}
                {filterTramLineInfo(LineId).map((line) => (
                  <RemoveService
                    id={line.id}
                    serviceNumber={line.serviceNumber}
                    mode="tram"
                    routeName={line.routeName}
                    key={line.routeName}
                    showRemove={false}
                  />
                ))}
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
