/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Button from 'components/shared/Button/Button';
import Autocomplete from './autocomplete/Autocomplete';
import Bus from './service/Bus';
import SectionStepInfo from '../../steps/SectionStepInfo';

function Step3AddService() {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const [bus, setBus] = useState([]);
  const [mode, setMode] = useState(null);
  const [hasSelectedBuses, setHasSelectedBuses] = useState(false);

  const handleRemove = (route) => {
    const filtered = bus.filter((busRoute) => {
      return busRoute.serviceNumber !== route;
    });
    setBus(filtered);
  };

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
      {hasSelectedBuses && mode === null && { continueButton }}
    </div>
  );
}

export default Step3AddService;
