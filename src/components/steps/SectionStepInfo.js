import React from 'react';
import style from './SectionStepInfo.module.scss';
import PropTypes from 'prop-types';

function SectionStepInfo(props) {
  const { section, description } = props;
  return (
    <div className={`${style.sectionWrapper}`}>
      <p className={`wmnds-m-b-xs ${style.section}`}>{section}</p>
      <p className={`wmnds-m-b-sm ${style.description}`}>{description}</p>
    </div>
  );
}

SectionStepInfo.propTypes = {
  section: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}


export default SectionStepInfo;
