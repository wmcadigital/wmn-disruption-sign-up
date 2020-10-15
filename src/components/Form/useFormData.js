import { useContext } from 'react';
import { FormDataContext } from '../../globalState/FormDataContext';

const useFormData = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const {
    Firstname,
    LastName,
    Email,
    Phone,
    BusServices,
    TramServices,
    ExistingUser,
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
  };
};

export default useFormData;
