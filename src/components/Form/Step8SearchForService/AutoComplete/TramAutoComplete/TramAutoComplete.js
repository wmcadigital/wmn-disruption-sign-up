import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// Custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Components
import Button from 'components/shared/Button/Button';
import WarningText from 'components/shared/WarningText/WarningText';
import TramAutoCompleteInput from './TramAutoCompleteInput';
import TramAutoCompleteSelectLine from './TramAutoCompleteSelectLine';

const TramAutoComplete = ({ closeAutoComplete }) => {
  const { formDataState, formDataDispatch } = useStepLogic();
  const [tramStops, setTramStops] = useState({ From: null, To: null });
  const [selectedLines, setSelectedLines] = useState([]);

  // Functions for updating local tramStops state
  const setTramStop = (direction) => (stop) => {
    setTramStops((prevState) => {
      return { ...prevState, [direction]: stop };
    });
  };
  const setTramStopFrom = setTramStop('From');
  const setTramStopTo = setTramStop('To');

  // Function for updating local tramLines state
  const setSlectedTramLines = useCallback((lineIds) => setSelectedLines(lineIds), []);

  // Function for pushing data to global state
  const selectTramOptions = () => {
    const { TramLines, LineId } = formDataState.formData;
    let newTramLines;
    let newLineIds;

    if (selectedLines.length) {
      newTramLines = [];
      newLineIds = [...LineId, ...selectedLines];
    } else {
      newTramLines = [...TramLines, tramStops];
      newLineIds = LineId;
    }

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        TramLines: newTramLines,
        LineId: newLineIds,
      },
    });
    closeAutoComplete();
  };

  // Helper booleans
  const bothStopsSelected = tramStops.From?.name && tramStops.To?.name;
  const isFullLineSelected = selectedLines.length > 0;
  const hasAnySelectedStops =
    formDataState.formData.TramLines.length > 0 || tramStops.From !== null || tramStops.To !== null;

  const warningMessage = (
    <p className="wmnds-m-b-none">
      Selecting the entire tram line will remove your current stop-by-stop alerts
    </p>
  );

  return (
    <>
      <div className="wmnds-col-1 wmnds-m-b-xl">
        <p>
          You can add a disruption alert between two stops <b>or</b> add the entire tram line.
        </p>
        <h4>Select stops between</h4>
        {/* From stop */}
        <TramAutoCompleteInput stop={tramStops.From} setStop={setTramStopFrom} />
        <strong className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md">and</strong>
        {/* To stop */}
        <TramAutoCompleteInput stop={tramStops.To} setStop={setTramStopTo} />
        {/* Select full line instead */}
        <h4 className="wmnds-m-t-lg">Or select entire tram line</h4>
        <TramAutoCompleteSelectLine
          selectedLines={formDataState.formData.LineId}
          setSelectedLines={setSlectedTramLines}
        />
        {/* Warning message for when selecting the whole line */}
        {isFullLineSelected && hasAnySelectedStops && (
          <div className="wmnds-grid">
            <div className="wmnds-col-md-7-8">
              <WarningText type="warning" message={warningMessage} className="wmnds-p-r-sm" />
            </div>
          </div>
        )}
      </div>
      {bothStopsSelected || isFullLineSelected ? (
        <Button btnClass="wmnds-btn wmnds-col-1" text="Continue" onClick={selectTramOptions} />
      ) : (
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <Button
            btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
            text="Cancel"
            onClick={closeAutoComplete}
          />
        </div>
      )}
    </>
  );
};

TramAutoComplete.propTypes = {
  closeAutoComplete: PropTypes.func.isRequired,
};

export default TramAutoComplete;
