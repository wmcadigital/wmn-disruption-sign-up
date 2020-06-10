/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

// Import contexts
import { useFormContext } from 'react-hook-form';
import { FormDataContext } from 'globalState/FormDataContext';

import Icon from '../../Icon/Icon';

const { sanitize } = dompurify;

const InputCheckbox = ({ fieldValidation, label, name, onChange }) => {
  const [formDataState] = useContext(FormDataContext); // Get the state of form data from FormDataContext
  const { errors } = useFormContext();
  // Set input to render below

  return (
    <div
      className={`wmnds-fe-group ${
        errors[name] ? 'wmnds-fe-group--error' : ''
      }`}
    >
      {errors[name] && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{
            __html: sanitize(errors[name].message),
          }}
        />
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
          ref={fieldValidation}
          className="wmnds-fe-checkboxes__input"
          value="terms"
          name="Terms"
          type="checkbox"
          checked={errors[name] === ''}
          onChange={onChange}
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon
            className="wmnds-fe-checkboxes__icon"
            iconName="general-checkmark"
          />
        </span>
      </label>
    </div>
  );
};

InputCheckbox.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  fieldValidation: PropTypes.func,
  inputmode: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
};

InputCheckbox.defaultProps = {
  autocomplete: null,
  className: '',
  fieldValidation: null,
  inputmode: 'text',
  spellcheck: false,
  type: 'text',
};

export default InputCheckbox;
