// Form abandonment tracking (https://www.simoahava.com/analytics/track-form-abandonment-with-google-tag-manager/)
import { useEffect, useState } from 'react';
// Import contexts

const useTrackFormAbandonment = (currentStep, formSubmitStatus) => {
  const [fieldsChanged, setFieldsChanged] = useState([]); // Track fields the user has touched/changed

  window.dataLayer = window.dataLayer || []; // Set datalayer (GA thing)

  // This useEffect is used to track form changes and update the fieldsChanged state as the user progresses
  useEffect(() => {
    const form = document.querySelector('form'); // Get DOM node of form
    // Function to work out last changed element in form
    const lastChangedEle = (e) => {
      console.log("e.target.name", e.target.name);
      // Update fields changed array with step number and last changed field name i.e. Step1: CustomerType > Step3: CardNumber
      setFieldsChanged([
        ...fieldsChanged,
        `Step${currentStep}: ${e.target.name}`,
      ]);
    };
    // Listen to changes in form and run above function
    form.addEventListener('change', lastChangedEle);
    // On unmount, remove listener
    return () => {
      form.removeEventListener('change', lastChangedEle);
    };
  }, [currentStep, fieldsChanged]);

  // Used to update Google Tag Manager
  useEffect(() => {
    // Function for updating datalayer with correct data
    const formAbandoned = () => {
      // If there is a current step and no form submit status then it means the user is still in progress of filling in the form, so we can log that as a true abandonment
      if (currentStep && !formSubmitStatus) {
        // Push abandoned event to GA/Tag Manager
        window.dataLayer.push({
          event: 'formAbandonment',
          eventCategory: 'wmn-email-alerts-signup abandonment',
          eventAction: fieldsChanged
            ? fieldsChanged.join(' > ')
            : 'Clicked start, but abandoned straight away.', // If fieldsChanged (set in first useEffect) is available then use that and join with ' > ' so it logs as 'Step1: ... > Step2: ... >' ELSE the user must of abandoned without updating the form in step 1 so log message
        });
      }
    };

    window.addEventListener('beforeunload', formAbandoned); // Run above function only when the user is leaving the page

    // On unmount, remove listener
    return () => {
      window.removeEventListener('beforeunload', formAbandoned);
    };
  }, [currentStep, fieldsChanged, formSubmitStatus]);

  // Sends a form started to analytics
  useEffect(() => {
    if (currentStep) {
      window.dataLayer.push({
        event: 'formAbandonment',
        eventCategory: 'wmn-email-alerts-signup started',
        eventAction: true,
      });
    }
  }, [currentStep]);
};

export default useTrackFormAbandonment;
