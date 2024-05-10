import React from 'react';
import dompurify from 'dompurify';
import PropTypes from 'prop-types';
import useStepLogic from 'components/Form/useStepLogic';

// Import styling
import s from './Dropdown.module.scss';

const { sanitize } = dompurify;

const Dropdown = ({ name, hint, parent, error, options, defaultValue, onChange, onBlur }) => {
  const { formDataState } = useStepLogic();
  const defaultSelectValue = defaultValue || formDataState.formData.QuietHours[parent]; // cast to acceptable types for a select element

  return (
    <div className={`${s.select} wmnds-fe-group wmnds-m-b-md`}>
      <fieldset className="wmnds-fe-fieldset">
        <div className={`wmnds-fe-dropdown${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          <label className="wmnds-fe-label" htmlFor={name}>
            {hint}
          </label>
          <select
            className="wmnds-fe-dropdown__select"
            id={name}
            name={name}
            defaultValue={defaultSelectValue || ''}
            onChange={onChange}
            onBlur={onBlur}
          >
            {options.map((option) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
};

// Set props
Dropdown.propTypes = {
  name: PropTypes.string,
  parent: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.PropTypes.oneOfType([PropTypes.shape, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

Dropdown.defaultProps = {
  name: '',
  parent: '',
  hint: '',
  error: '',
  defaultValue: '',
  onBlur: () => {},
};
export default Dropdown;
