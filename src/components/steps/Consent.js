import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FormDataContext } from '../../globalState/FormDataContext';
import Icon from '../Icon-old';

const apiUrl = 'https://rtccdisruptions6zqwajo6s.azurewebsites.net/api/SignUp';

function Consent(props) {
  const { setCurrentStep } = props;
  const [formContext, formDispatch] = useContext(FormDataContext);
  const [dataToSend, setDataToSend] = useState({});
  const [inProgress, setInProgress] = useState(false);
  const { terms, firstName, lastName, email, bus } = formContext;
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = () => {
    setInProgress(true);
    axios.post(apiUrl, dataToSend).then(
      (response) => {
        setCurrentStep('Success');
        setInProgress(false);
      },
      (error) => {
        console.log(error);
        setCurrentStep('Error');
      }
    );
  };
  const onInputChange = (e, tp) => {
    const type = tp.toUpperCase();
    formDispatch({
      type: `AGREE_TO_${type}`,
      payload: !formContext[tp],
    });
  };

  useEffect(() => {
    const LineId = bus.map((service) => {
      return service.serviceId;
    });
    const Name = `${firstName} ${lastName}`;
    setDataToSend({
      Name,
      Email: email,
      LineId,
    });
    setInProgress(false);
  }, [bus, email, firstName, lastName, terms]);

  return (
    <div className="style.consent">
      <h3>
        Consent
        <Icon
          className="wmnds-btn__icon wmnds-btn__icon--right"
          iconName="general-expand"
        />
      </h3>

      <div className="wmnds-fe-group">
        <fieldset className="wmnds-fe-fieldset wmnds-m-b-xl">
          <div className="wmnds-fe-checkboxes">
            <div
              className={`wmnds-fe-groupp ${
                errors.Terms ? 'wmnds-fe-group--error' : ''
              }`}
            >
              {errors.Terms && (
                <span className="wmnds-fe-error-message">
                  Agree to terms and conditions before continue
                </span>
              )}
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
                  onChange={(e) => onInputChange(e, 'terms')}
                />
                <span className="wmnds-fe-checkboxes__checkmark">
                  <Icon
                    className="wmnds-fe-checkboxes__icon"
                    iconName="general-checkmark"
                  />
                </span>
              </label>
            </div>
          </div>
        </fieldset>
        <button
          disabled={inProgress || !terms ? 'disabled' : ''}
          type="button"
          className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
          onClick={handleSubmit(onSubmit)}
        >
          Accept and sign up
        </button>
      </div>
    </div>
  );
}

Consent.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default Consent;
