/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import Button from 'components/shared/Button/Button';
// import { getNodeText } from '@testing-library/react';
import { FormDataContext } from '../../../globalState/FormDataContext';
// Import custom hooks
// import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Bus from '../../shared/transportServiceType/Bus';
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';

function Step3AddService() {
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

  const getNextStep = (increment) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep + increment,
    });
  };

  useEffect(() => {
    setHasSelectedBuses(bus.length > 0);
  }, [bus]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div className="wmnds-col-1">
        {/* Subsection */}
        <SectionStepInfo section="Section 2 of 2" description="Services" />
        <h2 className="">Add a service</h2>
        <p className="wmnds-col-2-3">
          You can sign up to 10 services at a time.
        </p>
        <p>You will receive an automatic email update for each disruption</p>
        <div>
          {hasSelectedBuses && (
            <>
              <h3>Services added</h3>
              <h4>Buses</h4>

              <div className={` ${hasSelectedBuses ? 'wmnds-m-b-xl' : ''}`}>
                {bus &&
                  bus.map((busRoute) => {
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
            </>
          )}
          {/* Add bus service button */}
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1 wmnds-col-md-1-2"
            onClick={() => {
              setMode('bus');
              getNextStep(1);
            }}
            text={`Add ${hasSelectedBuses ? 'another' : ''} bus service`}
            iconRight="general-expand"
          />
        </div>

        {/* Continue button */}
        {hasSelectedBuses && mode === null && (
          <Button
            btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md"
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

export default Step3AddService;
