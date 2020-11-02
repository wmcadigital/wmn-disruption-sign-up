import React, { useContext } from 'react';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';

const AddTrainService = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { Trains } = formDataState.formData;

  const getNextStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep + incrementAmount,
    });
  };

  const updateMode = (mode) => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: mode,
    });
  };
  return (
    <>
      {/* {/* Add train service button */}
      <h3 className="wmnds-p-t-md">Trains</h3>
      <Button
        btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left wmnds-col-1"
        onClick={() => {
          getNextStep(1);
          updateMode('train');
        }}
        text={`Add ${Trains && Trains.length > 0 ? 'another' : ''} train service`}
        iconRight="general-expand"
      />
      {/* {/* Show the train services the user has added */}
      {Trains && Trains.length > 0 && (
        <>
          <h4>Train lines that you want to add</h4>
          <div className="wmnds-m-b-lg">
            {Trains[0].LineIds.map((line) => {
              return (
                <RemoveService showRemove serviceNumber={line} id={line} key={line} mode="train" />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AddTrainService;
