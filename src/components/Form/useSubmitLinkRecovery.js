import { useState } from 'react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';

const useSubmitLinkRecovery = (setFormSubmitStatus) => {
  const { triggerValidation, getValues } = useFormContext(); // Get useForm methods
  const [isFetching, setIsFetching] = useState(false);
  const [APIErrorMessage, setAPIErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission method
    // Validation
    const result = await triggerValidation();
    // if no errors
    if (result) {
      // Map all destructured vals above to an object we will send to API
      const dataToSend = {
        Email: getValues().RecoveryEmail,
      };
      // Start submitting API
      setIsFetching(true); // Set this so we can put loading state on button
      // Go hit the API with the data
      axios({
        url: '/personinfo',
        baseURL: `${process.env.REACT_APP_API_HOST}api`,
        method: 'post',
        data: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200) {
            // Log event to analytics/tag manager
            window.dataLayer.push({
              event: 'formAbandonment',
              eventCategory: 'wmn-recover-dashboard-link: success',
            });
            setIsFetching(false); // set to false as we are done fetching now
            setFormSubmitStatus(true); // Set form status to success
            window.scrollTo(0, 0); // Scroll to top of page

            return true;
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })

        // If has errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setIsFetching(false);
          let errMsg;
          if (error.response && error.response.data) {
            errMsg = error.response.data;
          } else {
            errMsg = error;
          }
          setAPIErrorMessage(errMsg);
          if (errMsg === "this email hasn't been registered") {
            // Log event to analytics/tag manager
            window.dataLayer.push({
              event: 'formAbandonment',
              eventCategory: 'wmn-recover-dashboard-link: error - email not registered',
              eventAction: errMsg,
            });
          } else {
            setFormSubmitStatus(false); // Set form status to success
            // Log event to analytics/tag manager
            window.dataLayer.push({
              event: 'formAbandonment',
              eventCategory: 'wmn-recover-dashboard-link: submission: error',
              eventAction: errMsg,
            });
          }
          setIsFetching(false); // set to false as we are done fetching now
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

export default useSubmitLinkRecovery;
