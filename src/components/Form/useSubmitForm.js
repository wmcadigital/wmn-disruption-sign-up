/* eslint-disable no-plusplus */
import { useState, useContext } from 'react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const useSubmitForm = (setFormSubmitStatus) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { triggerValidation, getValues } = useFormContext(); // Get useForm methods
  const [isFetching, setIsFetching] = useState(false);
  const [APIErrorMessage, setAPIErrorMessage] = useState(null);

  // Destructure values from our formDataState (get all users values)
  const {
    Email,
    Firstname,
    LastName,
    LineId,
    Trains,
    TramLines,
    RoadAreas,
    EmailAlert,
    Phone,
    ExistingUser,
    UserId,
    QuietHours,
    QuietDays,
  } = formDataState.formData;

  // Check if mobile phone has +44, if not, remove the 0 and add +44
  let englishNumber = Phone;
  if (Phone && Phone.substr(0, 1) === '0') {
    englishNumber = `+44${Phone.substr(1)}`;
  }

  // Convert road areas to correct shape for the api
  const RoadLines = RoadAreas.map((area) => ({
    name: area.address,
    lat: area.lat,
    lon: area.lon,
    distance: area.radius * 1609.34,
  }));

  const convertH2M = (timeInHour) => {
    const timeParts = timeInHour.split(':');
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  };
  // Convert date to correct shape for the api
  const QuietTimes = QuietHours.map((time) => ({
    StartTime: convertH2M(`${time.startHour}:${time.startMinute}`),
    EndTime: convertH2M(`${time.endHour}:${time.endMinute}`),
  }));

  const format = (n) => {
    // eslint-disable-next-line no-bitwise
    return `${`0${(n / 60) ^ 0}`.slice(-2)}:${`0${n % 60}`.slice(-2)}`;
  };

  const merge = (arr) => {
    const arrFiltered = (r) => {
      return r.EndTime > r.StartTime;
    };
    const arrSorted = arr.filter(arrFiltered);
    const result = arrSorted.sort((a, b) => {
      return a.StartTime - b.StartTime;
    });
    let i = 0;

    while (i < result.length - 1) {
      const current = result[i];
      const next = result[i + 1];

      // check if there is an overlapping
      if (current.EndTime >= next.StartTime) {
        current.EndTime = Math.max(current.EndTime, next.EndTime);
        // remove next
        result.splice(i + 1, 1);
      } else {
        // move to next
        i++;
      }
    }
    return result;
  };
  const results = merge(QuietTimes).map((i) => [format(i.StartTime), format(i.EndTime)]);
  const QuietTimesFiltered = results.map((time) => ({
    StartTime: time[0],
    EndTime: time[1],
  }));
  // Map all destructured vals above to an object we will send to API
  const dataToSend = {
    Name: `${Firstname} ${LastName}`,
    Email,
    LineId: LineId.length > 0 ? LineId : ['1001'],
    Trains,
    TramLines: TramLines.map((line) => ({ From: line.From.id, To: line.To.id })),
    RoadLines,
    EmailDisabled: EmailAlert !== 'yes',
    MobileNumber: englishNumber || '',
    siteCode: ExistingUser ? UserId : '',
    QuietDays: QuietDays.map((v) => ({ day: v })),
    QuietTimePeriods: QuietTimesFiltered,
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
        baseURL: `${process.env.REACT_APP_API_HOST}/api`,
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

            // Create an event label with the users contact preferences and if they are a newUser or existing
            const eventLabel = `newUser: ${!ExistingUser}, email: ${
              EmailAlert === 'yes'
            }, sms: ${!!Phone}`;
            // Log event to analytics/tag manager
            window.dataLayer.push({
              event: 'formAbandonment',
              eventCategory: 'wmn-disruption-sign-up',
              eventAction: 'form submitted: success',
              eventLabel,
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
            eventCategory: 'wmn-disruption-sign-up',
            eventAction: 'form submitted: error',
            eventLabel: errMsg,
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
