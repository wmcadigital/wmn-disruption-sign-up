import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../FormContext';
import style from './Summary.module.scss';
import Bus from './service/Bus';

function Summary(props) {
  const formContext = useContext(FormContext);
  const { firstName, lastName, email, bus } = formContext[0];
  const { setCurrentStep } = props;
  // const {}
  return (
    <div className={`wmnds-col-1 ${style.summary}`}>
      <h2>Check your answers before signing up to email alerts</h2>
      <p className="wmnds-col-1">
        You can sign up to as many services as you would like You will receive
        an automatic email update for each disruption
      </p>
      <h3>Personal details</h3>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-sm">
        <div
          className={`wmnds-m-b-sm wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
        >
          <div className="wmnds-col-1-3 wmnds-p-t-xs wmnds-p-b-xs">
            <strong>Name</strong>
          </div>
          <div className="wmnds-col-1-3 wmnds-p-t-xs wmnds-p-b-xs">{`${firstName} ${lastName}`}</div>
          <div className="wmnds-col-1-3 wmnds-p-t-xs wmnds-p-b-xs">
            <button
              type="button"
              className={`${style.asLink} wmnds-link`}
              onClick={() => {
                setCurrentStep('FullName');
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-sm">
        <div
          className={`wmnds-m-b-sm wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
        >
          <div className="wmnds-col-1-3">
            <strong>Contact details</strong>
          </div>
          <div className="wmnds-col-1-3">{email}</div>
          <div className="wmnds-col-1-3">
            <button
              type="button"
              className={`${style.asLink} wmnds-link`}
              onClick={() => {
                setCurrentStep('Email');
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      <h3>Services added</h3>
      <div>
        {bus.length > 0 && <h3 className="wmnds-fe-question">Buses</h3>}
        <div
          className={` ${
            bus.length > 0 ? 'bdr-primary-bottom wmnds-m-b-xl' : ''
          }`}
        >
          {bus &&
            bus.map((busRoute) => {
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
      </div>
    </div>
  );
}

Summary.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default Summary;
