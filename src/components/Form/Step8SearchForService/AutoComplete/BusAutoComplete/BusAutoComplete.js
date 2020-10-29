/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// Import components
import Button from 'components/shared/Button/Button';
import Message from 'components/Message';
import Icon from 'components/shared/Icon/Icon';
import useFormData from '../../../useFormData';
import BusAutoCompleteResult from './BusAutoCompleteResult';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';

const BusAutoComplete = ({ mode, setMode }) => {
  const [lineNumber, setLineNumber] = useState();
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/bus/v1/service?q=${encodeURI(lineNumber)}`,
    'bus',
    lineNumber
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    debounceInput,
    results
  );

  const { formDataState, formDataDispatch } = useFormData();

  const getPreviousStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep - incrementAmount,
    });
  };

  const BusServices = formDataState.formData.BusServices || [];
  const busId = formDataState.formData.LineId || [];

  const filterResults = () => {
    if (BusServices.length > 0) {
      const newResults = results.filter(
        (result) => !BusServices.some((el) => el.id === result.id)
      );
      return newResults;
    }
    return results;
  };

  const handleCancel = () => {
    setMode(null);
  };

  return (
    <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xl">
      <div className="wmnds-col-md-3-5 wmnds-col-lg-4-5">
        <div
          className={`wmnds-autocomplete wmnds-grid ${
            loading ? 'wmnds-is--loading' : ''
          }`}
        >
          <div className="wmnds-wmnds-col-1 wmnds-col-lg-11-12">
            <Icon
              iconName="general-search"
              className="wmnds-autocomplete__icon"
            />
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content"> Content is loading... </p>
            </div>
            <DebounceInput
              type="text"
              name="busSearch"
              placeholder="Search for a service"
              className="wmnds-fe-input wmnds-autocomplete__input"
              value={lineNumber || ''}
              onChange={(e) => setLineNumber(e.target.value)}
              aria-label="Search for a service"
              debounceTimeout={600}
              onKeyDown={(e) => handleKeyDown(e)}
              inputRef={debounceInput}
            />
          </div>
        </div>
        {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
        {!results.length && !loading && errorInfo && lineNumber ? (
          <Message
            type="error"
            title={errorInfo.title}
            message={errorInfo.message}
          />
        ) : (
          lineNumber && (
            <div className="wmnds-wmnds-col-1 wmnds-col-lg-11-12">
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {filterResults().map((result) => {
                  if (busId && busId.indexOf(result.id) < 0) {
                    // eslint-disable-next-line no-unused-expressions
                    return (
                      <BusAutoCompleteResult
                        key={result.id}
                        result={result}
                        handleKeyDown={handleKeyDown}
                        type={mode}
                        handleCancel={handleCancel}
                      />
                    );
                  }
                })}
              </ul>
            </div>
          )
        )}
      </div>
      <div className="wmnds-col-1 wmnds-col-md-1-5">
        <Button
          btnClass="wmnds-btn wmnds-btn--primary wmnds-col-1"
          text="Cancel"
          onClick={() => {
            getPreviousStep(1);
          }}
        />
      </div>
    </div>
  );
};

BusAutoComplete.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default BusAutoComplete;
