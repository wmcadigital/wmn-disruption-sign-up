/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useStepLogic from '../useStepLogic';

import SummarySection from './Step4SummarySection';
// import Consent from '../../steps/Consent';
import Button from '../../shared/Button/Button';
import Input from '../../shared/FormElements/Input/Input';
import Icon from '../../shared/Icon/Icon';

function Summary({ isFetching, APIErrorMessage, handleSubmit }) {
  const formRef = useRef();
  const { register, showGenericError } = useStepLogic(formRef);
  const checkboxValidation = register({
    required: 'Agree to terms and conditions before continue',
  });
  return (
    <form onSubmit={handleSubmit} data-private>
      <SummarySection />
      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        {/* <label className="wmnds-fe-checkboxes__container">
          I have read the{' '}
          <a
            href="https://www.wmca.org.uk/policies"
            target="_blank"
            title="Read our Privacy Policy"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{' '}
          and agree to be emailed about disruptions.
        </label>
        <Input
          className="wmnds-fe-checkboxes__input"
          name="Terms"
          label=""
          type="checkbox"
          fieldValidation={checkboxValidation}
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon
            className="wmnds-fe-checkboxes__icon"
            iconName="general-checkmark"
          />
        </span> */}
        <label className="wmnds-fe-checkboxes__container">
          I have read the{' '}
          <a
            href="https://www.wmca.org.uk/policies"
            target="_blank"
            title="Read our Privacy Policy"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{' '}
          and agree to be emailed about disruptions.
          <input
            ref={register({
              required: true,
            })}
            className="wmnds-fe-checkboxes__input"
            value="terms"
            name="Terms"
            type="checkbox"
            onChange={(e) => console.log('foo')}
          />
          <span className="wmnds-fe-checkboxes__checkmark">
            <Icon
              className="wmnds-fe-checkboxes__icon"
              iconName="general-checkmark"
            />
          </span>
        </label>
      </fieldset>
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
