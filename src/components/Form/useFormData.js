import { useContext } from 'react';
import { FormDataContext } from '../../globalState/FormDataContext';

const useFormData = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { mode } = formDataState;
  const setMode = (newMode) => {
    formDataDispatch({
      type: 'UPDATE_MODE',
      payload: newMode,
    });
  };

  const {
    Firstname,
    LastName,
    Email,
    Phone,
    BusServices,
    TramServices,
    ExistingUser,
    SMSAlert,
    EmailAlert,
    SMSTerms,
  } = formDataState.formData;
  return {
    Firstname,
    LastName,
    Email,
    Phone,
    BusServices,
    TramServices,
    ExistingUser,
    formDataState,
    formDataDispatch,
    mode,
    setMode,
    SMSAlert,
    EmailAlert,
    SMSTerms,
  };
};

export default useFormData;
