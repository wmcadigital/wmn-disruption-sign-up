import React, { useState } from 'react';
import Intro from './components/Intro';
import Form from './components/Form/Form';
// Import contexts
import { FormDataProvider } from './globalState/FormDataContext';
import Breadcrumb from './components/Breadcrumb';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);

  return (
    <div className="wmnds-container wmnds-p-b-lg wmnds-grid">
      <Breadcrumb />
      {!isFormStarted ? (
        <Intro setIsFormStarted={setIsFormStarted} />
      ) : (
        <FormDataProvider>
          <Form />
        </FormDataProvider>
      )}
    </div>
  );
}

export default App;
