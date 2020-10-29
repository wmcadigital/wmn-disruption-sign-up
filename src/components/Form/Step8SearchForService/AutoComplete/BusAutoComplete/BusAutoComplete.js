import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// Custom Hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Button from 'components/shared/Button/Button';
import Message from 'components/Message';
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult';
// Local CustomHooks
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';

const BusAutoComplete = ({ mode, setMode }) => {
  const { formDataState, setStep } = useStepLogic(); // get formDataState and setStep logic from customHook
  const [query, setQuery] = useState(); // placeholder for getting/setting query
  const BusServices = formDataState.formData.BusServices || []; // Get currently selected bus services

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // customHook used to fetch results based on query
  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/bus/v1/service?q=${encodeURI(query)}`,
    'bus',
    query
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    debounceInput,
    results
  );

  // Go back to prev step if cancel
  const handleCancel = () => {
    setStep(formDataState.currentStep - 1);
    setMode(null);
  };

  return (
    <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xl">
      <div className="wmnds-col-md-3-5 wmnds-col-lg-4-5 wmnds-p-r-md">
        <div
          className={`wmnds-autocomplete wmnds-grid ${
            loading ? 'wmnds-is--loading' : ''
          }`}
        >
          <Icon
            iconName="general-search"
            className="wmnds-autocomplete__icon"
          />
          <div className="wmnds-loader" role="alert" aria-live="assertive">
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
          <DebounceInput
            type="text"
            name="busSearch"
            placeholder="Search for a service"
            className="wmnds-fe-input wmnds-autocomplete__input"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for a service"
            debounceTimeout={600}
            onKeyDown={(e) => handleKeyDown(e)}
            inputRef={debounceInput}
          />
        </div>
        {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
        {!results.length && query && !loading && errorInfo ? (
          <Message
            type="error"
            title={errorInfo.title}
            message={errorInfo.message}
          />
        ) : (
          query && (
            <div className="wmnds-wmnds-col-1 wmnds-col-lg-11-12">
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {/* Only show autocomplete results if there is a query, also filter out any results that the user has already added
                 */}
                {results
                  .filter(
                    (result) => !BusServices.some((el) => el.id === result.id)
                  )
                  .map((result) => {
                    return (
                      <BusAutoCompleteResult
                        key={result.id}
                        result={result}
                        handleKeyDown={handleKeyDown}
                        type={mode}
                        handleCancel={handleCancel}
                      />
                    );
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
          onClick={handleCancel}
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
