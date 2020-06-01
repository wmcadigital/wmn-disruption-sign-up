import React, { useState } from 'react';
import Intro from './components/Intro';
import Form from './components/Form';
import { FormProvider } from './FormContext';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(true);
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
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
