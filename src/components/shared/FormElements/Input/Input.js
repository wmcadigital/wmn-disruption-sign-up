import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { useForm } from 'react-hook-form';
import { FormDataContext } from 'globalState/FormDataContext';

const { sanitize } = dompurify;

function Input({
  autocomplete,
  className,
  fieldValidation,
  inputmode,
  label,
  name,
  spellcheck,
  type,
  APIerrors,
}) {
  const [formDataState] = useContext(FormDataContext); // Get the state of form data from FormDataContext
  // const { errors } = useFormContext();
  const {
    formState: { errors },
  } = useForm();
  console.log(fieldValidation);
  console.log(formDataState);
  console.log(errors);
  // Set input to render below
  const input = (
    <input
      autoComplete={autocomplete}
      className={`wmnds-fe-input ${errors[name] || APIerrors ? 'wmnds-fe-input--error' : ''}`}
      defaultValue={formDataState.formData[name]}
      id={name}
      inputMode={inputmode}
      name={name}
      ref={fieldValidation}
      spellCheck={spellcheck}
      type={type}
    />
  );

  return (
    <div className={`wmnds-fe-group ${errors[name] || APIerrors ? 'wmnds-fe-group--error' : ''}`}>
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          className="wmnds-fe-label"
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: sanitize(label) }}
        />
      )}
      {/* If there is an API error, show here */}
      {APIerrors}

      {/* If there is an error (and error is a string) show here */}
      {errors[name] && typeof errors[name].message === 'string' && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{ __html: sanitize(errors[name].message) }}
        />
      )}
      {/* If there is an error (and error is a react element) show here */}
      {errors[name] && typeof errors[name].message !== 'string' && errors[name].message}

      {/* If className then wrap just input with the className else, just show input as usual */}
      {className ? <div className={className}>{input}</div> : input}
    </div>
  );
}

Input.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  fieldValidation: PropTypes.func,
  inputmode: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
  APIerrors: PropTypes.element,
};

Input.defaultProps = {
  autocomplete: null,
  className: '',
  fieldValidation: null,
  inputmode: 'text',
  spellcheck: false,
  type: 'text',
  APIerrors: null,
};

export default Input;
