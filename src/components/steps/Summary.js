/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../globalState/FormDataContext';

import style from './Summary.module.scss';
import Bus from '../shared/transportServiceType/Bus';
import Consent from './Consent';

function Summary(props) {
  const [formContext] = useContext(FormContext);
  const { firstName, lastName, email, bus } = formContext;
  const { setCurrentStep } = props;

  return (
    <div className={`wmnds-col-1 ${style.summary}`}>
      <h2>Check your answers before signing up to email alerts</h2>
      <ul className="wmnds-col-1">
        <li>You can sign up to as many services as you would like</li>
        <li>You will receive an automatic email update for each disruption</li>
      </ul>
      <h3>Personal details</h3>
      <div className="wmnds-grid wmnds-grid--justify-between">
        <div
          className={`wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
        >
          <div className="wmnds-col-1-3">
            <strong>Name</strong>
          </div>
          <div className="wmnds-col-1-3">{`${firstName} ${lastName}`}</div>
          <div className="wmnds-col-1-3">
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
      <div className="wmnds-grid wmnds-grid--justify-between">
        <div
          className={`wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
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
      <div
        className={`wmnds-m-b-sm wmnds-m-t-xl wmnds-grid wmnds-grid--justify-between ${style.serviceAdded}`}
      >
        <h3 className="wmnds-col-1-3">Services added</h3>
        <button
          type="button"
          className={`${style.asLink} wmnds-link`}
          onClick={() => {
            setCurrentStep('AddService');
          }}
        >
          Change
        </button>
      </div>

      <div className={style.busses}>
        {bus.length > 0 && <h4>Buses</h4>}
        <div className={` ${bus.length > 0 ? 'wmnds-m-b-xl' : ''}`}>
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
      <Consent setCurrentStep={setCurrentStep} />
    </div>
  );
}

Summary.propTypes = {
  setCurrentStep: PropTypes.bool.isRequired,
};

export default Summary;
