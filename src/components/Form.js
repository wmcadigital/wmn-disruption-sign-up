import React, { useContext, useState } from 'react';
import { FormContext } from '../FormContext';

import FullName from './steps/FullName';
import Email from './steps/Email';
import AddService from './steps/AddService';
import SectionTitle from './steps/SectionTitle';

import style from './Form.module.scss';

const Form = () => {
  const [formState, formDispatch] = useContext(FormContext);
  const [currentStep, setCurrentStep] = useState('FullName');
  const handleGoBack = () => {
    if (currentStep === 'Email') {
      return setCurrentStep('FullName');
    }
    if (currentStep === 'AddService') {
      return setCurrentStep('Email');
    }
  };
  const STEPS = {
    FullName: <FullName setCurrentStep={setCurrentStep} />,
    Email: <Email setCurrentStep={setCurrentStep} />,
    AddService: <AddService setCurrentStep={setCurrentStep} />,
  };
  return (
    <div className="wmnds-col-1 wmnds-col-md-3-4">
      <a onClick={() => handleGoBack()}> Back </a>
      <SectionTitle />
      <div className={`wmnds-p-lg ${style.formWrapper}`}>
        <form autoComplete="on">{STEPS[currentStep]}</form>
      </div>
    </div>
  );
};

export default Form;
