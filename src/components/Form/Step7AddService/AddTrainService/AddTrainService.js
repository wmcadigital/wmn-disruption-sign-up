import React, { useContext } from 'react';
// Context
import { FormDataContext } from 'globalState/FormDataContext';
// Components
import Button from 'components/shared/Button/Button';
import Train from 'components/shared/transportServiceType/Bus';

const AddTrainService = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { TrainServices } = formDataState.formData;

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
        text={`Add ${TrainServices && TrainServices.length > 0 ? 'another' : ''} train service`}
        iconRight="general-expand"
      />
      {/* {/* Show the train services the user has added */}
      {TrainServices && TrainServices.length > 0 && (
        <>
          <h4>Train lines that you want to add</h4>
          <div className="wmnds-m-b-lg">
            {TrainServices.map((busRoute) => {
              return (
                <Train
                  showRemove
                  // handleRemove={handleRemoveBus}
                  serviceNumber={busRoute.serviceNumber}
                  routeName={busRoute.routeName}
                  id={busRoute.id}
                  key={`${busRoute.id}`}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AddTrainService;
