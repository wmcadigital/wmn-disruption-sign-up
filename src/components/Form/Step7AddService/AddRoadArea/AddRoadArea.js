import React from 'react';
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';
import useStepLogic from 'components/Form/useStepLogic';

const AddRoadService = () => {
  const { setStep, formDataState, formDataDispatch } = useStepLogic();
  const { RoadAreas } = formDataState.formData;

  const handleRemoveRoad = (lat, lon) => {
    formDataDispatch({ type: 'REMOVE_ROAD', payload: { lat, lon } });
  };

  const handleAddRoad = () => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: 'road',
    });
    setStep(formDataState.currentStep + 1);
  };

  return (
    <>
      <h3 className="wmnds-p-t-md">Roads</h3>
      {/* Add road service button */}
      <Button
        btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
        onClick={handleAddRoad}
        text={`Add ${RoadAreas && RoadAreas.length > 0 ? 'another' : ''} road area`}
        iconRight="general-expand"
      />
      {/* Show the road services the user has added */}
      {RoadAreas && RoadAreas.length > 0 && (
        <>
          <h4 className="wmnds-m-b-sm wmnds-m-t-lg">Road areas you want to add</h4>
          {RoadAreas.map((area) => {
            return (
              <RemoveService
                showRemove
                onClick={() => handleRemoveRoad(area.lat, area.lon)}
                mode="road"
                routeName={`${area.address} + ${area.radius} miles`}
                key={`${area.lat}${area.lon}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default AddRoadService;
