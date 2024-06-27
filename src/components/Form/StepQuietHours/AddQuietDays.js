import React, { useState, useCallback, useRef } from 'react';
// Context
// Components
import Button from 'components/shared/Button/Button';
import Checkboxes from 'components/shared/FormElements/Checkboxes/Checkboxes';
import useStepLogic from 'components/Form/useStepLogic';

function AddQuietDays() {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { formDataState, formDataDispatch } = useStepLogic(formRef);
  const [showDays, setShowDays] = useState(false);
  const [confirmDays, setConfirmDays] = useState(false);
  const { QuietDays } = formDataState.formData;
  const checkBoxes = [
    { text: 'Mon', value: 'Monday' },
    { text: 'Tue', value: 'Tuesday' },
    { text: 'Wed', value: 'Wednesday' },
    { text: 'Thu', value: 'Thursday' },
    { text: 'Fri', value: 'Friday' },
    { text: 'Sat', value: 'Saturday' },
    { text: 'Sun', value: 'Sunday' },
  ];
  const [days, setDays] = useState(0);

  const callback = useCallback((day) => {
    setDays(day);
  }, []);

  const handleCancelDays = () => {
    setConfirmDays(false);
    setShowDays(false);
  };

  const handleAddDays = () => {
    if (days) {
      formDataDispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          QuietDays: [...days],
        },
      });
    }
    setConfirmDays(false);
    setShowDays(false);
  };
  const handleShowDays = () => {
    setShowDays(true);
    setConfirmDays(true);
  };

  return (
    <>
      <h3 className="wmnds-m-t-sm">Quiet days</h3>
      {QuietDays && QuietDays.length < 1 ? (
        <p>You will not receive alerts for 24 hours on selected days.</p>
      ) : (
        <p>
          You will not receive alerts on
          {QuietDays.length > 1 ? (
            <span>
              <strong> {QuietDays.slice(0, -1).join(', ')}</strong> and{' '}
            </span>
          ) : (
            ` `
          )}
          <strong>{QuietDays[QuietDays.length - 1]}</strong>.
        </p>
      )}
      {/* Add quiet days button */}
      {!showDays && !confirmDays ? (
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <Button
            btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-m-b-sm wmnds-col-sm-auto"
            onClick={handleShowDays}
            text={QuietDays && QuietDays.length < 1 ? `Set quiet days` : `Edit your quiet days`}
            aria-label={
              QuietDays && QuietDays.length < 1 ? `Set quiet days` : `Edit your quiet days`
            }
          />
        </div>
      ) : (
        <div>
          <Checkboxes
            checkboxes={checkBoxes}
            name="Quietdays"
            parentCallback={callback}
            aria-label="Edit your quiet days"
          />
          <div className="wmnds-m-b-sm">
            <Button
              btnClass="wmnds-text-align-left wmnds-btn wmnds-col-sm-auto"
              onClick={handleAddDays}
              text="Confirm quiet days"
              aria-label="Confirm quiet days"
            />
            <Button
              btnClass="wmnds-btn--primary wmnds-m-l-lg wmnds-btn wmnds-col-sm-auto"
              onClick={handleCancelDays}
              text="Cancel"
              aria-label="Cancel"
            />
          </div>
        </div>
      )}
      <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
    </>
  );
}

export default AddQuietDays;
