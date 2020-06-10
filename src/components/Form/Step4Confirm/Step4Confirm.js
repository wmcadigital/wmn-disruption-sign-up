/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useStepLogic from '../useStepLogic';

import SummarySection from './Step4SummarySection';
import Step4ConsentForm from './Step4ConsentForm';
// import Consent from '../../steps/Consent';
import Button from '../../shared/Button/Button';
import InputCheckbox from '../../shared/FormElements/Input/InputCheckbox';

function Summary({ isFetching, APIErrorMessage, handleSubmit }) {
  const formRef = useRef();
  const { register } = useStepLogic(formRef);

  return (
    <form onSubmit={handleSubmit} data-private>
      <SummarySection />

      {/* If we get any errors back from the server, show here */}
      {APIErrorMessage && (
        <span className="wmnds-fe-error-message">{APIErrorMessage}</span>
      )}
      <div className="wmnds-col-1">
        {/* If API is fetching */}
        {/* {isFetching && (
          <div
            className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
            role="alert"
            aria-live="assertive"
          >
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        )} */}
        {/* <InputCheckbox
          name="Terms"
          label="label"
          type="checkbox"
          value="terms"
          fieldValidation={checkboxValidation}
        /> */}
        <Step4ConsentForm />

        <Button
          disabled={isFetching}
          iconRight="general-chevron-right"
          isFetching={isFetching}
          type="submit"
          text="Accept and sign up"
        />
      </div>
    </form>
  );
}

Summary.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  APIErrorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

Summary.defaultProps = {
  APIErrorMessage: null,
};

export default Summary;
