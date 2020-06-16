import React, { useState } from 'react';
import Intro from './components/Intro';
import Form from './components/Form/Form';
// Import contexts
import { FormDataProvider } from './globalState/FormDataContext';
import HeaderAndBreadcrumb from './components/HeaderAndBreadCrumb';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  return (
    <>
      <HeaderAndBreadcrumb
        isFormStarted={isFormStarted}
        formSubmitStatus={formSubmitStatus}
      />
      <div className="wmnds-container wmnds-p-b-lg wmnds-grid">
        {!isFormStarted ? (
          <Intro setIsFormStarted={setIsFormStarted} />
        ) : (
          <FormDataProvider>
            <Form
              setFormSubmitStatus={setFormSubmitStatus}
              formSubmitStatus={formSubmitStatus}
            />
          </FormDataProvider>
        )}
      </div>
    </>
  );
}

export default App;
