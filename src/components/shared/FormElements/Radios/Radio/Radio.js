/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const { sanitize } = dompurify;

function Radio({ name, fieldValidation, text, value, onChange }) {
  const [formDataState] = useContext(FormDataContext); // Get the state of form data from FormDataContext

  return (
    <label className="wmnds-fe-radios__container">
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(text),
        }}
      />
      <input
        className="wmnds-fe-radios__input"
        name={name}
        type="radio"
        ref={fieldValidation}
        value={value}
        defaultChecked={formDataState.formData[name] === value}
        onChange={onChange}
      />
      <span className="wmnds-fe-radios__checkmark" />
    </label>
  );
}

// PropTypes
Radio.propTypes = {
  name: PropTypes.string.isRequired,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  fieldValidation: null,
  onChange: null,
};

export default Radio;
