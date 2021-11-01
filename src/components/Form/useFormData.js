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
    QuietHours,
    QuietDays,
    ExistingUser,
    SMSAlert,
    EmailAlert,
    DisruptionAlert,
    SMSTerms,
  } = formDataState.formData;
  return {
    Firstname,
    LastName,
    Email,
    Phone,
    BusServices,
    TramServices,
    QuietHours,
    QuietDays,
    ExistingUser,
    formDataState,
    formDataDispatch,
    mode,
    setMode,
    SMSAlert,
    EmailAlert,
    DisruptionAlert,
    SMSTerms,
  };
};

export default useFormData;
