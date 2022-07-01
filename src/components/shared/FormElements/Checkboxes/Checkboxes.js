import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { useFormContext } from 'react-hook-form';
// Import components
import useStepLogic from 'components/Form/useStepLogic';
import Checkbox from './Checkbox/Checkbox';

const { sanitize } = dompurify;

const Checkboxes = ({ name, label, checkboxes, fieldValidation, parentCallback }) => {
  const { errors } = useFormContext();
  const { formDataState } = useStepLogic();
  const { QuietDays } = formDataState.formData;
  const selectedDays = checkboxes.map((a) => QuietDays.includes(a.value));
  const [checkedState, setCheckedState] = useState(selectedDays);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const daysSelected = updatedCheckedState.map((currentState, index) => {
      if (currentState === true) {
        return checkboxes[index].value;
      }
      return null;
    });
    const filtered = daysSelected.filter((a) => a);
    parentCallback(filtered);
  };
  return (
    <div>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          {label && <h2 className="wmnds-fe-question">{label}</h2>}
          {/* If there is an error, show here */}
          {errors[name] && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(errors[name].message),
              }}
            />
          )}
        </legend>
        <div className="wmnds-fe-checkboxes">
          {/* Loop through checkboxes and display each checkbox */}
          {checkboxes.map(({ text, value }, index) => (
            <Checkbox
              key={text}
              name={name}
              text={text}
              value={value}
              fieldValidation={fieldValidation}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
              aria-label={name}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

// PropTypes
Checkboxes.propTypes = {
  fieldValidation: PropTypes.func,
  parentCallback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checkboxes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string, PropTypes.string)).isRequired,
};

Checkboxes.defaultProps = {
  fieldValidation: null,
  label: null,
};

export default Checkboxes;
