import { useState, useContext } from 'react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
import { configs } from 'eslint-plugin-prettier';

const useSubmitForm = (setFormSubmitStatus) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { triggerValidation, getValues } = useFormContext(); // Get useForm methods
  const [isFetching, setIsFetching] = useState(false);
  const [APIErrorMessage, setAPIErrorMessage] = useState(null);

  // Destructure values from our formDataState (get all users values)
  const { Email, Firstname, LastName, LineId, Trains, EmailAlert, Phone } = formDataState.formData;

  // Check if mobile phone has +44, if not, remove the 0 and add +44
  let englishNumber = Phone;
  if (Phone && Phone.substr(0, 1) === '0') {
    englishNumber = `+44${Phone.substr(1)}`;
  }

  // Map all destructured vals above to an object we will send to API
  const dataToSend = {
    Name: `${Firstname} ${LastName}`,
    Email,
    LineId: LineId.length > 0 ? LineId : ['1001'],
    Trains,
    EmailDisabled: EmailAlert !== 'yes',
    MobileNumber: englishNumber,
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission method
    // Validation
    const result = await triggerValidation();
    // if no errors
    if (result) {
      formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: getValues() }); // Map to global state

      // Start submitting API
      setIsFetching(true); // Set this so we can put loading state on button
      // Go hit the API with the data
      axios({
        url: '/SignUp',
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'post',
        data: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            const payload = response.config.data;
            formDataDispatch({ type: 'ADD_FORM_REF', payload }); // Update form state with the form ref received from server
            // Log event to analytics/tag manager
            window.dataLayer.push({
              event: 'formAbandonment',
              eventCategory: 'wmn-email-alerts-signup: success',
            });
            setIsFetching(false); // set to false as we are done fetching now
            if (payload.Message) {
              setAPIErrorMessage(payload.Message);
            } else {
              setFormSubmitStatus(true); // Set form status to success
              window.scrollTo(0, 0); // Scroll to top of page
              // set success page
            }
            return true;
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })

        // If formsubmission errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          let errMsg;

          if (error.text) {
            error.text().then((errorMessage) => {
              errMsg = errorMessage;
            });
          } else {
            errMsg = error;
          }

          // Log event to analytics/tag manager
          window.dataLayer.push({
            event: 'formAbandonment',
            eventCategory: 'wmn-email-alerts-signup: submission: error',
            eventAction: errMsg,
          });
          setIsFetching(false); // set to false as we are done fetching now
          setFormSubmitStatus(false); // Set form status to error
          window.scrollTo(0, 0); // Scroll to top of page
          // set error message
        });
    }
  };

  // Return handleSubmit and isFetching so it can be used by form
  return {
    handleSubmit,
    isFetching,
    APIErrorMessage,
  };
};

export default useSubmitForm;
