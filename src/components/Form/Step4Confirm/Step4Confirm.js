/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import SummarySection from './Step4SummarySection';
// import Consent from '../../steps/Consent';
import Button from '../../shared/Button/Button';
import style from './Step4Confirm.module.scss';

function Summary({ isFetching, APIErrorMessage, handleSubmit }) {
  // const { setCurrentStep } = props;
  // const [step, setStep] = useState(4);

  return (
    <form onSubmit={handleSubmit} data-private>
      <SummarySection />
      {/* If we get any errors back from the server, show here */}
      {APIErrorMessage && (
        <span className="wmnds-fe-error-message">{APIErrorMessage}</span>
      )}
      <div className="wmnds-col-1">
        {/* If API is fetching */}
        {isFetching && (
          <div
            className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
            role="alert"
            aria-live="assertive"
          >
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        )}

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

Summary.propTypes = {};

export default Summary;
