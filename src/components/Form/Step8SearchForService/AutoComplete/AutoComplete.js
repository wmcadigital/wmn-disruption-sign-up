/* eslint-disable import/no-unresolved */
import React from 'react';
// Import hooks
import useFormData from 'components/Form/useFormData';
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import BusAutoComplete from './BusAutoComplete/BusAutoComplete';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';
import TramAutoComplete from './TramAutoComplete/TramAutoComplete';
import RoadAutoComplete from './RoadAutoComplete/RoadAutoComplete';

function AutoComplete() {
  const { mode, setMode } = useFormData();
  const { formDataState, setStep } = useStepLogic();

  const closeAutoComplete = () => {
    setMode(null);
    setStep(formDataState.currentStep - 1);
  };

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (text) => {
      return (
        <div className="wmnds-col-1">
          <h4>{text}</h4>
          {mode === 'bus' && <p>For example, X8 or 101</p>}
        </div>
      );
    };

    switch (mode) {
      case 'bus':
        return (
          <>
            {autoCompleteTitle(`Search for a bus service`)}
            <BusAutoComplete closeAutoComplete={closeAutoComplete} />
          </>
        );

      case 'train':
        return <TrainAutoComplete closeAutoComplete={closeAutoComplete} />;

      case 'tram':
        return <TramAutoComplete closeAutoComplete={closeAutoComplete} />;

      case 'road':
        return <RoadAutoComplete closeAutoComplete={closeAutoComplete} />;

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
}

export default AutoComplete;
