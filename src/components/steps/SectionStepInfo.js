import React from 'react';
import PropTypes from 'prop-types';
import style from './SectionStepInfo.module.scss';

function SectionStepInfo(props) {
  const { section, description } = props;
  return (
    <div className={`${style.sectionWrapper}`}>
      <p className={`wmnds-m-b-xs ${style.section}`}>{section}</p>
      <p className={`wmnds-m-b-sm ${style.description}`}>
        <strong>{description}</strong>
      </p>
    </div>
  );
}

SectionStepInfo.propTypes = {
  section: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SectionStepInfo;
