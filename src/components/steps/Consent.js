import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormContext } from '../../FormContext';
import Icon from '../Icon';

function Consent(props) {
  const { setCurrentStep } = props;
  const [formContext, formDispatch] = useContext(FormContext);
  const { terms } = formContext;
  const { handleSubmit } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (val) => {
    console.log(val);
    setCurrentStep('Success');
  };
  const onInputChange = (e, tp) => {
    console.log('formContext[type]', formContext[tp]);
    const type = tp.toUpperCase();
    formDispatch({
      type: `AGREE_TO_${type}`,
      payload: !formContext[tp],
    });
  };
  return (
    <div className="style.consent">
      <h2>
        Consent
        <Icon
          className="wmnds-btn__icon wmnds-btn__icon--right"
          iconName="general-expand"
        />
      </h2>

      <div className="wmnds-fe-group">
        <fieldset className="wmnds-fe-fieldset">
          <div className="wmnds-fe-checkboxes">
            <label className="wmnds-fe-checkboxes__container">
              I have read the
              <a href="https://www.wmca.org.uk/policies" target="_blank" title="Read our Privacy Policy">
                Privacy Policy
              </a>
              and agree to be emailed about disruptions.
              <input
                className="wmnds-fe-checkboxes__input"
                value="Option 1"
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
        </fieldset>
        {terms && (
          <button
            type="button"
            className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
            onClick={handleSubmit(onSubmit)}
          >
            Accept and sign up
          </button>
        )}
      </div>
    </div>
  );
}

Consent.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default Consent;
