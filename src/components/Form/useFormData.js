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
    BusServices,
    TramServices,
    QuietHours,
    QuietDays,
    ExistingUser,
    EmailAlert,
    DisruptionAlert,
  } = formDataState.formData;
  return {
    Firstname,
    LastName,
    Email,
    BusServices,
    TramServices,
    QuietHours,
    QuietDays,
    ExistingUser,
    formDataState,
    formDataDispatch,
    mode,
    setMode,
    EmailAlert,
    DisruptionAlert,
  };
};

export default useFormData;
