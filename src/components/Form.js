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

  return (
    <div className="wmnds-col-1 wmnds-col-md-3-4">
      {/* <Back /> */}
      <SectionTitle />
      <div className={`wmnds-p-lg ${style.formWrapper}`}>
        <form autoComplete="on">
          <FullName />
          <Email />
          <AddService />
        </form>
      </div>
    </div>
  );
}

export default Form;
