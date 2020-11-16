/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useSubmitForm from '../useSubmitForm';
import SummarySection from './Step9SummarySection';
import Step9ConsentForm from './Step9ConsentForm';
import { FormDataContext } from '../../../globalState/FormDataContext';
import Button from '../../shared/Button/Button';

function Step9Confirm({ setFormSubmitStatus }) {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  // Get handleSubmit fn and isFetching from custom hook which handles submitting data to API (this is used in the last step[4])
  const { handleSubmit, isFetching, APIErrorMessage } = useSubmitForm(setFormSubmitStatus);
  useEffect(() => {
    if (formDataState.currentStep === 9) {
      formDataDispatch({
        type: 'REACHED_CONFIRMATION',
        payload: true,
      });
    }
  }, [formDataDispatch, formDataState.currentStep]);

  return (
    <form onSubmit={handleSubmit} data-private>
      {/* If we get any errors back from the server, show here */}
      {APIErrorMessage && <span className="wmnds-fe-error-message">{APIErrorMessage}</span>}
      <SummarySection />

      <div className="wmnds-col-1">
        {formDataState.formData.EmailAlert === 'yes' && !formDataState.formData.ExistingUser && (
          <Step9ConsentForm />
        )}
        <Button
          btnClass="wmnds-btn--start wmnds-m-t-lg"
          disabled={isFetching}
          iconRight="general-chevron-right"
          isFetching={isFetching}
          type="submit"
          text={
            formDataState.formData.ExistingUser
              ? 'Sign up to text message alerts'
              : 'Sign up to disruption alerts'
          }
        />
      </div>
    </form>
  );
}

Step9Confirm.propTypes = {
  setFormSubmitStatus: PropTypes.func.isRequired,
};

export default Step9Confirm;
