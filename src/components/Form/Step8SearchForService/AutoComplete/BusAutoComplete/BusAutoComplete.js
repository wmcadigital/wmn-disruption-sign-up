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

const BusAutoComplete = ({ closeAutoComplete }) => {
  const { formDataState } = useStepLogic(); // get formDataState and setStep logic from customHook
  const [query, setQuery] = useState(); // placeholder for getting/setting query
  const BusServices = formDataState.formData.BusServices || []; // Get currently selected bus services

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // Remove all spaces for the query so the user can still get results when query is formatted incorrectly
  const formatQuery = (queryString) => {
    if (!queryString) return '';
    return queryString.replace(/\s/g, '').trim();
  };

  // customHook used to fetch results based on query
  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/bus/v1/service?q=${encodeURI(formatQuery(query))}`,
    'bus',
    query
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, debounceInput, results);

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const serviceNumberA = a.serviceNumber.toUpperCase();
    const serviceNumberB = b.serviceNumber.toUpperCase();
    const routeNameA = a.routes[0].routeName.toUpperCase();
    const routeNameB = b.routes[0].routeName.toUpperCase();
    let comparison = 0;
    if (serviceNumberA > serviceNumberB) {
      comparison = 1;
    } else if (serviceNumberA < serviceNumberB) {
      comparison = -1;
    } else if (routeNameA > routeNameB) {
      // if service number is equal compare route name
      comparison = 1;
    } else if (routeNameA < routeNameB) {
      // if service number is equal compare route name
      comparison = -1;
    }
    return comparison;
  }

  return (
    <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xl">
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-m-t-sm">
        <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
          <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
          <div className="wmnds-loader" role="alert" aria-live="assertive">
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
          <DebounceInput
            type="text"
            name="busSearch"
            placeholder="Search for a bus service"
            className="wmnds-fe-input wmnds-autocomplete__input"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for a bus service"
            debounceTimeout={600}
            onKeyDown={(e) => handleKeyDown(e)}
            inputRef={debounceInput}
          />
        </div>
        {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
        {!results.length && query && !loading && errorInfo ? (
          <Message type="error" title={errorInfo.title} message={errorInfo.message} />
        ) : (
          query && (
            <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
              {/* Only show autocomplete results if there is a query, also filter out any results that the user has already added
               */}
              {results
                .filter((result) => !BusServices.some((el) => el.id === result.id))
                .sort(compare)
                .map((result) => {
                  return (
                    <BusAutoCompleteResult
                      key={result.id}
                      result={result}
                      handleKeyDown={handleKeyDown}
                      handleCancel={closeAutoComplete}
                    />
                  );
                })}
            </ul>
          )
        )}
      </div>
      <div className="wmnds-col-1 wmnds-col-md-1-5 wmnds-m-t-sm">
        <Button
          btnClass="wmnds-btn wmnds-btn--primary wmnds-col-auto wmnds-col-md-1 wmnds-float-right"
          text="Cancel"
          onClick={closeAutoComplete}
        />
      </div>
    </div>
  );
};

BusAutoComplete.propTypes = {
  closeAutoComplete: PropTypes.func.isRequired,
};

export default BusAutoComplete;
