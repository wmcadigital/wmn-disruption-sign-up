/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import Button from 'components/shared/Button/Button';
import { getNodeText } from '@testing-library/react';
import { FormDataContext } from '../../../globalState/FormDataContext';
// Import custom hooks
// import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Autocomplete from './autocomplete/Autocomplete';
import Bus from '../../shared/transportServiceType/Bus';
import SectionStepInfo from '../../steps/SectionStepInfo';

function Step3AddService() {
  // const formRef = useRef(); // Used so we can keep track of the form DOM element
  // const {
  //   register,
  //   handleSubmit,
  //   showGenericError,
  //   continueButton,
  // } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const [mode, setMode] = useState(null);
  const [bus, setBus] = useState(formDataState.formData.BusServices || []);
  const [hasSelectedBuses, setHasSelectedBuses] = useState(false);

  const handleRemove = (route) => {
    const filtered = bus.filter((busRoute) => {
      return busRoute.serviceNumber !== route;
    });
    setBus(filtered);
  };

  // Logic used to validate fields
  // const fieldValidation = () => {
  //   return register({ required: `This field is required` });
  // };
  const getNextStep = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.hasReachedConfirmation
        ? 4
        : formDataState.currentStep + 1,
    });
  };

  useEffect(() => {
    const busServiceId = [];
    bus.map((single) => {
      return busServiceId.push(single.serviceId);
    });
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { LineId: busServiceId },
    });
    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { BusServices: bus },
    });
  }, [bus, formDataDispatch, mode]);

  useEffect(() => {
    setHasSelectedBuses(bus.length > 0);
  }, [bus]);

  return (
    <div className="wmnds-col-1">
      {/* Subsection */}
      <SectionStepInfo section="Section 2 of 2" description="Services" />
      <h2 className="">Add a service</h2>
      <p className="wmnds-col-2-3">
        You can sign up to as many services as you would like.
      </p>
      <p>You will receive an automatic email update for each disruption</p>
      {mode !== null ? (
        <Autocomplete mode={mode} setMode={setMode} setBus={setBus} />
      ) : (
        <div>
          {hasSelectedBuses && (
            <>
              <h3>Services added</h3>
              <h4>Buses</h4>
            </>
          )}

          <div className={` ${hasSelectedBuses ? 'wmnds-m-b-xl' : ''}`}>
            {bus &&
              bus.map((busRoute) => {
                console.log('in map:', busRoute);
                return (
                  <Bus
                    showRemove
                    handleRemove={handleRemove}
                    serviceNumber={busRoute.serviceNumber}
                    routeName={busRoute.routeName}
                    key={`${busRoute.serviceNumber}`}
                  />
                );
              })}
          </div>
          {/* <input
            name={bus}
            type="hidden"
            ref={fieldValidation}
            value={bus || ''}
          /> */}

          {/* Add bus service button */}
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-2"
            onClick={() => setMode('bus')}
            text={`Add ${hasSelectedBuses ? 'another' : ''} bus service`}
            iconRight="general-expand"
          />
        </div>
      )}

      {/* Continue button */}
      {hasSelectedBuses && mode === null && (
        <Button
          btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md"
          type="submit"
          text="Continue"
          onClick={() => {
            getNextStep();
          }}
        />
      )}
    </div>
  );
}

export default Step3AddService;
