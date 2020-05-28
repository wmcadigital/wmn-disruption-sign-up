/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import { FormContext } from '../../FormContext';

import Icon from '../Icon';
import Bus from './service/Bus';

function AddService() {
  const [triggered, setTriggered] = useState(null);
  const [formState, formDispatch] = useContext(FormContext);
  const { bus } = formState;

  const onButtonClick = (e, type) => {
    e.preventDefault();
    setTriggered(type);
  };

  const handleSubmit = () => {
    console.log('next');
  };

  const handleRemove = (route) => {
    const filtered = bus.filter((busRoute) => {
      return busRoute.serviceNumber !== route;
    });
    formDispatch({
      type: 'RESET_SERVICES_BUS',
      payload: filtered,
    });
  };

  return (
    <div className="wmnds-col-1">
      <h3 className="wmnds-fe-question">Add a service</h3>
      <p>
        You can sign up to as many services as you would like You will receive
        an automatic email update for each disruption
      </p>
      {triggered !== null ? (
        <Autocomplete service={triggered} setTriggered={setTriggered} />
      ) : (
        <div>
          {formState.bus.length > 0 && (
            <h3 className="wmnds-fe-question">Buses</h3>
          )}
          {formState.bus &&
            formState.bus.map((busRoute) => {
              return (
                <Bus
                  handleRemove={handleRemove}
                  serviceNumber={busRoute.serviceNumber}
                  routeName={busRoute.routeName}
                  key={`${busRoute.serviceNumber}`}
                />
              );
            })}
          <hr />
          <button
            className="wmnds-btn wmnds-col-1 wmnds-col-sm-auto wmnds-m-r-lg wmnds-m-t-md"
            onClick={(e) => onButtonClick(e, 'bus')}
          >
            Add bus service
            <Icon
              className="wmnds-btn__icon wmnds-btn__icon--right"
              iconName="general-chevron-right"
            />
          </button>
        </div>
      )}
      {formState.bus.length > 0 && (
        <button
          type="button"
          className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
          onClick={() => handleSubmit()}
        >
          Continue
        </button>
      )}
    </div>
  );
}

export default AddService;
