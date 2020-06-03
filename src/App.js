import React, { useState } from 'react';
import Intro from './components/Intro';
import Form from './components/Form';
import { FormProvider } from './FormContext';
import Breadcrumb from './components/Breadcrumb';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);

  return (
    <div className="wmnds-container wmnds-p-b-lg wmnds-grid wmnds-p-t-lg">
      <Breadcrumb />
      {!isFormStarted ? (
        <Intro setIsFormStarted={setIsFormStarted} />
      ) : (
        <FormProvider>
          <Form />
        </FormProvider>
      )}
    </div>
  );
}

export default App;
