/* eslint-disable import/no-unresolved */
import React from 'react';
// Import components
import useFormData from 'components/Form/useFormData';
import BusAutoComplete from './BusAutoComplete/BusAutoComplete';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';

const AutoComplete = () => {
  const { mode } = useFormData();

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (text) => {
      return (
        <div className="wmnds-col-1">
          <h4>{`Search for a ${text} service`}</h4>
        </div>
      );
    };

    switch (mode) {
      case 'bus':
        return (
          <>
            {autoCompleteTitle(`Search for a bus service`)}
            <BusAutoComplete />
          </>
        );

      case 'train':
        return <TrainAutoComplete />;

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

export default AutoComplete;
