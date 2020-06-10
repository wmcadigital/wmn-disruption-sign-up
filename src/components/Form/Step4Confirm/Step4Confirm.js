/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useSubmitForm from '../useSubmitForm';
import useStepLogic from '../useStepLogic';
import SummarySection from './Step4SummarySection';
import Step4ConsentForm from './Step4ConsentForm';
// import Consent from '../../steps/Consent';
import Button from '../../shared/Button/Button';
import InputCheckbox from '../../shared/FormElements/Input/InputCheckbox';

function Summary({ setFormSubmitStatus }) {
  const formRef = useRef();
  const { register } = useStepLogic(formRef);

  // Get handleSubmit fn and isFetching from custom hook which handles submitting data to API (this is used in the last step[4])
  const { handleSubmit, isFetching, APIErrorMessage } = useSubmitForm(
    setFormSubmitStatus
  );

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

Summary.propTypes = {
  setFormSubmitStatus: PropTypes.bool.isRequired,
};

export default Summary;
