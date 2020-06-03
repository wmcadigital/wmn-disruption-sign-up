import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import Form from './components/Form';
import { FormProvider } from './FormContext';
import Breadcrumb from './components/Breadcrumb';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [showBreadcrumb, setshowBreadcrumb] = useState(true);
  const [currentStep, SetCurrentStepBreadcrumbs] = useState('Intro');
  useEffect(() => {
    if (
      currentStep === 'Intro' ||
      currentStep === 'Success' ||
      currentStep === 'Error'
    ) {
      setshowBreadcrumb(true);
    } else {
      setshowBreadcrumb(false);
    }
  }, [currentStep]);

  return (
    <div
      className={`wmnds-container wmnds-p-b-lg wmnds-grid ${
        currentStep !== 'Intro' ? 'wmnds-p-t-lg' : ''
      }`}
    >
      {showBreadcrumb && <Breadcrumb />}
      {!isFormStarted ? (
        <Intro setIsFormStarted={setIsFormStarted} />
      ) : (
        <FormProvider>
          <Form SetCurrentStepBreadcrumbs={SetCurrentStepBreadcrumbs} />
        </FormProvider>
      )}
    </div>
  );
}

export default App;
