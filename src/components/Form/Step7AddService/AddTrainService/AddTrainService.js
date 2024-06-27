import React from 'react';
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';
import useStepLogic from 'components/Form/useStepLogic';

function AddTrainService() {
  const { setStep, formDataState, formDataDispatch } = useStepLogic();
  const { Trains } = formDataState.formData;

  const handleRemoveTrain = (id) => {
    // If there is just one line left, then we reset the trains object as there is nothing else to remove so we may as well get rid of all train state (all stations user has built up)
    if (formDataState.formData.Trains[0].LineIds.length === 1) {
      formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: { Trains: [] } });
    }
    // Else, remove individual train line
    else {
      formDataDispatch({ type: 'REMOVE_TRAIN', payload: id });
    }
  };

  const handleAddTrain = () => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: 'train',
    });
    setStep(formDataState.currentStep + 1);
  };

  return (
    <>
      {/* {/* Add train service button */}
      <h3 className="wmnds-p-t-md">Trains</h3>
      <Button
        btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        onClick={handleAddTrain}
        text={`Add ${Trains && Trains.length > 0 ? 'another' : ''} train service`}
        iconRight="general-expand"
      />
      {/* {/* Show the train services the user has added */}
      {Trains && Trains.length > 0 && (
        <>
          <h4 className="wmnds-m-b-sm wmnds-m-t-lg">Train lines that you want to add</h4>
          {Trains[0].LineIds.map((line) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveTrain(line)}
                serviceNumber={line}
                id={line}
                key={line}
                mode="train"
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default AddTrainService;
