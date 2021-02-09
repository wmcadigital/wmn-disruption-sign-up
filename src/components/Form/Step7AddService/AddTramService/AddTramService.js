import React from 'react';
// Hooks
import useSelectableTramLines from 'components/Form/useSelectableTramLines';
import useStepLogic from 'components/Form/useStepLogic';
// Components
import Button from 'components/shared/Button/Button';
import RemoveService from 'components/shared/RemoveService/RemoveService';

const AddTramService = () => {
  const { formDataState, formDataDispatch, setStep } = useStepLogic();
  const { selectableTramLineIds, selectableTramLineInfo } = useSelectableTramLines();
  const { TramLines, LineId } = formDataState.formData;

  // Move to the next step
  const showTramAutoComplete = () => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: 'tram',
    });
    setStep(formDataState.currentStep + 1);
  };

  // Functions to update global state
  const removeTramStops = (route) => {
    const { From, To } = route;
    formDataDispatch({ type: 'REMOVE_TRAM', payload: { From, To } });
  };

  const removeTramLine = (lineId) => {
    formDataDispatch({ type: 'REMOVE_LINE', payload: { lineId } });
  };

  // Get the info for selected full lines
  const selectedFullTramLines = selectableTramLineInfo.filter((line) => LineId.includes(line.id));

  // Helper booleans
  const anyStopsSelected = TramLines && TramLines.length > 0;
  const isFullLineSelected = selectableTramLineIds.some((lineId) => LineId.includes(lineId));

  return (
    <>
      <h3 className="wmnds-p-t-md">Trams</h3>
      {/* Add tram service button */}
      {!isFullLineSelected && (
        <Button
          btnClass="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
          onClick={showTramAutoComplete}
          text="Add tram service"
          iconRight="general-expand"
        />
      )}
      {(anyStopsSelected || isFullLineSelected) && (
        <h4 className="wmnds-m-b-sm wmnds-m-t-lg">Tram services that you want to add</h4>
      )}
      {/* Show the tram services the user has added */}
      {anyStopsSelected && !isFullLineSelected ? (
        <>
          {TramLines.map((route) => {
            return (
              <RemoveService
                showRemove
                onClick={() => removeTramStops(route)}
                serviceNumber="MM1"
                mode="tram"
                routeName={`${route.From.name} to ${route.To.name}`}
                id={`${route.From.id}-${route.To.id}`}
                key={`${route.From.id}-${route.To.id}`}
              />
            );
          })}
        </>
      ) : (
        <>
          {selectedFullTramLines.map((line) => {
            return (
              <RemoveService
                showRemove
                onClick={() => removeTramLine(line.id)}
                serviceNumber={line.serviceNumber}
                mode="tram"
                routeName={line.routeName}
                key={line.routeName}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default AddTramService;
