import React, { useState } from 'react';

import FullName from './steps/FullName';
import Email from './steps/Email';
import AddService from './steps/AddService';
import Summary from './steps/Summary';
import Success from './steps/Success';
import Error from './steps/Error';

import style from './Form.module.scss';

const Form = () => {
  const [currentStep, setCurrentStep] = useState('FullName');
  const handleGoBack = () => {
    if (currentStep === 'Email') {
      return setCurrentStep('FullName');
    }
    if (currentStep === 'AddService') {
      return setCurrentStep('Email');
    }
    if (currentStep === 'Summary') {
      return setCurrentStep('AddService');
    }
  };
  const STEPS = {
    FullName: <FullName setCurrentStep={setCurrentStep} />,
    Email: <Email setCurrentStep={setCurrentStep} />,
    AddService: <AddService setCurrentStep={setCurrentStep} />,
    Summary: <Summary setCurrentStep={setCurrentStep} />,
    Success: <Success />,
    Error: <Error />,
  };
  return (
    <div className="wmnds-col-1 wmnds-col-md-3-4">
      {currentStep !== 'FullName' &&
      currentStep !== 'Success' &&
      currentStep !== 'Error' ? (
        <button
          type="button"
          className={`${style.asLink} wmnds-link wmnds-m-b-sm`}
          onClick={() => {
            handleGoBack();
          }}
        >
          Back
        </button>
      ) : null}
      <div
        className={` ${
          currentStep !== 'Success' ? `${style.formWrapper} wmnds-p-lg` : ''
        }`}
      >
        <form autoComplete="on">{STEPS[currentStep]}</form>
      </div>
    </div>
  );
};

export default Form;
