import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Components
import Button from 'components/shared/Button/Button';
import RoadAutoCompleteInput from './RoadAutoCompleteInput';
import RoadAutoCompleteRadiusInput from './RoadAutoCompleteRadiusInput/RoadAutoCompleteRadiusInput';
import RoadAutoCompleteMap from './RoadAutoCompleteMap/RoadAutoCompleteMap';

const RoadAutoComplete = ({ closeAutoComplete }) => {
  const { formDataState, formDataDispatch } = useStepLogic();
  const [area, setArea] = useState(null);

  const initialRadius = 3;
  const [radius, setRadius] = useState(initialRadius);
  useEffect(() => {
    if (!area) setRadius(initialRadius);
  }, [area]);

  const addRoadArea = () => {
    const newRoadArea = {
      address: area.address,
      lat: area.location.y,
      lon: area.location.x,
      radius,
    };

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        RoadAreas: [...formDataState.formData.RoadAreas, newRoadArea],
      },
    });
    closeAutoComplete();
  };

  return (
    <>
      <div className="wmnds-col-1">
        <h4>Enter a location</h4>
        <p className="wmnds-m-b-sm">A postcode, a road name or a place of interest</p>
        <RoadAutoCompleteInput area={area} setRoadArea={setArea} />
      </div>
      {area && (
        <div className="wmnds-col-1 wmnds-m-t-md">
          <h4 className="wmnds-m-b-md">Enter search radius (miles)</h4>
          <RoadAutoCompleteRadiusInput radius={radius} setRadius={setRadius} />
          <RoadAutoCompleteMap lat={area.location.y} lon={area.location.x} radius={radius} />
        </div>
      )}
      <div className="wmnds-col-1 wmnds-col-md-2-5">
        {area ? (
          <Button
            btnClass="wmnds-btn wmnds-m-r-md wmnds-m-t-md"
            text="Continue"
            onClick={addRoadArea}
          />
        ) : (
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-m-t-md"
            text="Cancel"
            onClick={closeAutoComplete}
          />
        )}
      </div>
    </>
  );
};

RoadAutoComplete.propTypes = {
  closeAutoComplete: PropTypes.func.isRequired,
};

export default RoadAutoComplete;
