import React, { useReducer, createContext } from 'react';
import { getSearchParam } from 'helpers/URLSearchParams';

export const FormDataContext = createContext();

export const FormDataProvider = (props) => {
  const { children } = props || {};

  let FirstName = null;
  let LastName = null;
  const UrlName = getSearchParam('name');

  if (UrlName && decodeURI(UrlName)) {
    [FirstName, LastName] = decodeURI(UrlName).split(' ');
  }

  // Set intial state of when
  const initialState = {
    currentStep: getSearchParam('email') && getSearchParam('email').length > 0 ? 3 : 1,
    formData: {
      Firstname: FirstName,
      LastName,
      Email: getSearchParam('email') || null,
      ExistingUser: getSearchParam('email') !== null || false,
      UserId: getSearchParam('user') || null,
      LineId: [],
      BusServices: [],
      TramLines: [],
      Trains: [],
      RoadAreas: [],
      QuietHours: [],
      QuietDays: [],
    },
    formRef: '',
    hasReachedConfirmation: false,
    isRequestingRecovery: false,
    mode: null,
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the point to chosen
    switch (action.type) {
      // Remove the waypoint by the id
      case 'UPDATE_FORM_DATA': {
        return {
          ...state,
          formData: { ...state.formData, ...action.payload },
        };
      }

      // Remove a line id
      case 'REMOVE_LINE': {
        return {
          ...state,
          formData: {
            ...state.formData,
            LineId: state.formData.LineId.filter((lineId) => action.payload.lineId !== lineId),
          },
        };
      }

      // Remove the bus route from form data
      case 'REMOVE_BUS': {
        return {
          ...state,
          formData: {
            ...state.formData,
            BusServices: state.formData.BusServices.filter((bus) => action.payload !== bus.id),
            LineId: state.formData.LineId.filter((busId) => action.payload !== busId),
          },
        };
      }

      // Remove the tram route from form data
      case 'REMOVE_TRAM': {
        return {
          ...state,
          formData: {
            ...state.formData,
            TramLines: state.formData.TramLines.filter(
              (line) =>
                action.payload.From.id !== line.From.id || action.payload.To.id !== line.To.id,
            ),
          },
        };
      }

      case 'REMOVE_TRAIN': {
        const { Trains } = state.formData;
        Trains[0].LineIds = Trains[0].LineIds.filter((line) => line !== action.payload);

        return {
          ...state,
          formData: {
            ...state.formData,
            Trains,
          },
        };
      }

      case 'REMOVE_ROAD': {
        const { RoadAreas } = state.formData;

        return {
          ...state,
          formData: {
            ...state.formData,
            RoadAreas: RoadAreas.filter((area) => {
              return action.payload.lat !== area.lat || action.payload.lon !== area.lon;
            }),
          },
        };
      }
      // Remove the quite hours from form data
      case 'REMOVE_QUIET_HOURS': {
        return {
          ...state,
          formData: {
            ...state.formData,
            QuietHours: state.formData.QuietHours.filter((hours) => action.payload !== hours.id),
          },
        };
      }
      // Update service mode
      case 'UPDATE_MODE': {
        return {
          ...state,
          mode: action.payload,
        };
      }

      // Remove the waypoint by the id
      case 'UPDATE_STEP': {
        return {
          ...state,
          currentStep: action.payload,
        };
      }
      // Used to add the form submission reference(got from API submit) to state
      case 'ADD_FORM_REF': {
        return {
          ...state,
          formRef: action.payload,
        };
      }

      case 'REACHED_CONFIRMATION': {
        return {
          ...state,
          hasReachedConfirmation: action.payload,
        };
      }

      case 'REACHED_RECOVERY': {
        return {
          ...state,
          isRequestingRecovery: action.payload,
        };
      }

      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <FormDataContext.Provider value={[formState, formDispatch]}>
      {children}
    </FormDataContext.Provider>
  );
};
