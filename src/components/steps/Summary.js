import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../FormContext';
import style from './Summary.module.scss';

function Summary(props) {
  const formContext = useContext(FormContext);
  const { fullName, email, bus } = formContext;
  const { setCurrentStep } = props;
  // const {}
  return (
    <div className={`wmnds-col-1 ${style.summary}`}>
      <h3 className="wmnds-fe-question">
        Check your answers before signing up to email alerts
      </h3>
      <p className="wmnds-col-1">
        You can sign up to as many services as you would like You will receive
        an automatic email update for each disruption
      </p>
      <h4>Personal details</h4>
      <div className="wmnds-grid wmnds-grid--justify-between">
        <div
          className={`wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
        >
          <div className="wmnds-col-1-3">Name</div>
          <div className="wmnds-col-1-3">{fullName}</div>
          <div className="wmnds-col-1-3">
            <button
              type="button"
              className={style.asLink}
              onClick={() => {
                setCurrentStep('FullName');
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      <div
        className={`wmnds-grid wmnds-grid--justify-between wmnds-col-1 ${style.details}`}
      >
        <div className="wmnds-col-1-3">Contact details</div>
        <div className="wmnds-col-1-3">{email}</div>
        <div className="wmnds-col-1-3">
          <button
            type="button"
            className={style.asLink}
            onClick={() => {
              setCurrentStep('Email');
            }}
          >
            Change
          </button>
        </div>
      </div>

      <h4>Services added</h4>
    </div>
  );
}

Summary.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default Summary;
