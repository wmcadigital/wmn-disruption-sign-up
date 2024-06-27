import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
// Custom Hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Message from 'components/Message';
import Icon from 'components/shared/Icon/Icon';
import RoadAutoCompleteResult from './RoadAutoCompleteResult';
import SelectedRoadArea from './SelectedRoadArea';
// Local CustomHooks
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';

function RoadAutoCompleteInput({ area, setRoadArea }) {
  const { formDataState } = useStepLogic();
  const RoadAreas = formDataState.RoadAreas || [];

  const removeSelectedAreas = (result) => {
    return !RoadAreas.some(
      (roadArea) => roadArea.lat === result.location.y && roadArea.lon === result.location.x,
    );
  };

  const [query, setQuery] = useState();
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${encodeURI(
      query,
    )}`,
    'road',
    query,
  );

  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, debounceInput, results);

  const clearArea = () => {
    setRoadArea(null);
    setQuery('');
  };

  return (
    <div>
      {area ? (
        <SelectedRoadArea area={area} clearArea={clearArea} />
      ) : (
        <div className="wmnds-grid wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-4-5">
            <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
              <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
              <div className="wmnds-loader" role="alert" aria-live="assertive">
                <p className="wmnds-loader__content">Content is loading...</p>
              </div>
              <DebounceInput
                type="text"
                name="roadAreaSearch"
                placeholder="Search"
                className="wmnds-fe-input wmnds-autocomplete__input"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
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
                <ul className="wmnds-autocomplete-suggestions wmnds-m-b-none" ref={resultsList}>
                  {/* Only show autocomplete results if there is a query, also filter out any results that the user has already added
                   */}
                  {results.filter(removeSelectedAreas).map((result) => {
                    return (
                      <RoadAutoCompleteResult
                        key={`${result.location.x}${result.location.y}`}
                        result={result}
                        handleKeyDown={handleKeyDown}
                        setRoadArea={setRoadArea}
                      />
                    );
                  })}
                </ul>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

RoadAutoCompleteInput.defaultProps = {
  area: null,
};

RoadAutoCompleteInput.propTypes = {
  area: PropTypes.shape({
    address: PropTypes.string,
    location: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  setRoadArea: PropTypes.func.isRequired,
};

export default RoadAutoCompleteInput;
