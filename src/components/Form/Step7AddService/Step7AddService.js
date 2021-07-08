import React, { useContext } from 'react';
import Button from 'components/shared/Button/Button';
// import { getNodeText } from '@testing-library/react';
import { FormDataContext } from '../../../globalState/FormDataContext';
// Import components
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';
import AddBusService from './AddBusService/AddBusService';
import AddTramService from './AddTramService/AddTramService';
import AddTrainService from './AddTrainService/AddTrainService';
import AddRoadArea from './AddRoadArea/AddRoadArea';

function Step7AddService() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { BusServices, TramLines, Trains, LineId, RoadAreas } = formDataState.formData;

  const getNextStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep + incrementAmount,
    });
  };

  const anyServicesSelected =
    (BusServices && BusServices.length > 0) ||
    (TramLines && TramLines.length > 0) ||
    (Trains && Trains.length > 0) ||
    (LineId && LineId.length > 0) ||
    (RoadAreas && RoadAreas.length > 0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div>
        {/* Subsection */}
        <SectionStepInfo section="Section 1 of 2" description="Services" />
        <h2 className="wmnds-fe-question">Add a service</h2>
        <p>We’ll send an automatic disruption alert for each service you add.</p>

        <AddBusService />

        <AddTramService />

        <AddTrainService />

        <AddRoadArea />

        {/* Continue button */}
        {anyServicesSelected && (
          <Button
            btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-xl"
            type="submit"
            text="Continue"
            onClick={() => {
              getNextStep(2);
            }}
          />
        )}
      </div>
    </form>
  );
}

export default Step7AddService;
