import React, { useState } from 'react';
// Context
// Components
import Button from 'components/shared/Button/Button';
import useStepLogic from 'components/Form/useStepLogic';
import QuietHoursComponent from './QuietHoursComponent';
import HoursMinutes from '../../shared/HoursMinutes/HoursMinutes';

const AddQuietHours = () => {
  const { formDataState, formDataDispatch } = useStepLogic();
  const [showHours, setShowHours] = useState(false);
  const { QuietHours } = formDataState.formData;
  const [times, setTimes] = useState({
    id: `${Math.random()}`,
    startHour: '00',
    startMinute: '00',
    endHour: '00',
    endMinute: '00',
  });

  const handleConfirmHours = () => {
    setShowHours(false);
  };

  const handleAddHours = () => {
    setTimes({
      id: `${Math.random()}`,
      startHour: '00',
      startMinute: '00',
      endHour: '00',
      endMinute: '00',
    });
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        QuietHours: [...QuietHours, times],
      },
    });
  };
  const handleShowHours = () => {
    setShowHours(true);
    if (QuietHours.length < 1) {
      handleAddHours();
    }
  };

  return (
    <>
      <div>
        {/* Subsection */}
        <h3 className="wmnds-p-t-md">Daily quiet hours</h3>
        {QuietHours && QuietHours.length < 1 ? (
          <p>You will not receive alerts at the selected times.</p>
        ) : (
          <p>
            You will not receive alerts between
            <HoursMinutes times={QuietHours} />.
          </p>
        )}
        {/* Add quiet hours button */}
        {!showHours || (QuietHours && QuietHours.length < 1) ? (
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <Button
              btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-m-b-sm wmnds-btn wmnds-col-sm-auto"
              onClick={handleShowHours}
              text={
                QuietHours && QuietHours.length < 1 ? `Set quiet hours` : `Edit your quiet hours`
              }
            />
          </div>
        ) : (
          <div>
            {/* Show the quiet hours the user has added */}
            {QuietHours && QuietHours.length > 0 && (
              <>
                {QuietHours.map((quietHours) => {
                  return (
                    <QuietHoursComponent
                      mode="quietHours"
                      quietHours={quietHours}
                      name={`${quietHours.id}`}
                      key={`${quietHours.id}`}
                    />
                  );
                })}
              </>
            )}
            <div>
              {QuietHours && QuietHours.length < 10 && (
                <Button
                  btnClass="wmnds-btn--secondary wmnds-text-align-left wmnds-m-r-sm wmnds-m-b-sm"
                  onClick={handleAddHours}
                  text="Add another time"
                  iconRight="general-expand"
                />
              )}
              <Button
                btnClass="wmnds-text-align-left"
                onClick={handleConfirmHours}
                text="Confirm quiet hours"
              />
            </div>
          </div>
        )}
        <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
      </div>
    </>
  );
};

export default AddQuietHours;
