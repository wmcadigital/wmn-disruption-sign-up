/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

// Import styling
import s from './Checkbox.module.scss';

const { sanitize } = dompurify;

const Checkbox = ({ name, fieldValidation, text, value, checked, onChange }) => {
  return (
    <>
      <label>
        <input
          className={`${s.checkbox}`}
          name={name}
          type="checkbox"
          ref={fieldValidation}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`wmnds-btn wmnds-btn--secondary wmnds-btn--block ${s.button} `}
          dangerouslySetInnerHTML={{
            __html: sanitize(text),
          }}
        />
      </label>
    </>
  );
};

// PropTypes
Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

Checkbox.defaultProps = {
  fieldValidation: null,
};

export default Checkbox;
