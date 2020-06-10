/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useSubmitForm from '../useSubmitForm';
import SummarySection from './Step4SummarySection';
import Step4ConsentForm from './Step4ConsentForm';
import { FormDataContext } from '../../../globalState/FormDataContext';
import Button from '../../shared/Button/Button';

function Step4Confirm({ setFormSubmitStatus }) {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  // Get handleSubmit fn and isFetching from custom hook which handles submitting data to API (this is used in the last step[4])
  const { handleSubmit, isFetching, APIErrorMessage } = useSubmitForm(
    setFormSubmitStatus
  );
  useEffect(() => {
    if (formDataState.currentStep === 4) {
      formDataDispatch({
        type: 'REACHED_CONFIRMATION',
        payload: true,
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} data-private>
      <SummarySection />

      {/* If we get any errors back from the server, show here */}
      {APIErrorMessage && (
        <span className="wmnds-fe-error-message">{APIErrorMessage}</span>
      )}
      <div className="wmnds-col-1">
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

Step4Confirm.propTypes = {
  setFormSubmitStatus: PropTypes.func.isRequired,
};

export default Step4Confirm;
