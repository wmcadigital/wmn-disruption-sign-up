import React, { useReducer, createContext } from 'react';

export const FormContext = createContext(); // Create when context

export const FormProvider = (props) => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    bus: [],
    tram: [],
    terms: false,
    email: false,
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the point to chosen
    switch (action.type) {
      case 'UPDATE_CUSTOMER_NAME': {
        return {
          ...state,
          firstName: action.payload,
        };
      }
      case 'UPDATE_CUSTOMER_SURNAME': {
        return {
          ...state,
          lastName: action.payload,
        };
      }

      // Remove the waypoint by the id
      case 'UPDATE_FORM_EMAIL': {
        return {
          ...state,
          email: action.payload,
        };
      }

      // Remove the waypoint by the id
      case 'SET_SERVICES_BUS': {
        return {
          ...state,
          bus: [...state.bus, action.payload],

        };
      }

      case 'RESET_SERVICES_BUS': {
        return {
          ...state,

          bus: action.payload,
        };
      }

      case 'SET_SERVICES_TRAM': {
        return {
          ...state,
          tram: [...state.tram, action.payload],
        };
      }
      case 'AGREE_TO_TERMS': {
        return {
          ...state,
          terms: action.payload,
        };
      }
      case 'AGREE_TO_EMAIL': {
        return {
          ...state,
          email: action.payload,
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
    <FormContext.Provider value={[formState, formDispatch]}>
      {children}
    </FormContext.Provider>
  );
};
