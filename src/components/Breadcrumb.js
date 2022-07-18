import React from 'react';

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="wmnds-breadcrumb wmnds-breadcrumb--mobile-app wmnds-col-1"
    >
      <ol className="wmnds-breadcrumb__list">
        <li className="wmnds-breadcrumb__list-item">
          <a href="https://wmnetwork.co.uk/plan-your-journey/" className="wmnds-breadcrumb__link">
            Plan a journey
          </a>
        </li>
        <li className="wmnds-breadcrumb__list-item">
          <a
            href="https://wmnetwork.co.uk/plan-your-journey/disruptions/"
            className="wmnds-breadcrumb__link"
          >
            Disruptions
          </a>
        </li>
        <li className="wmnds-breadcrumb__list-item">
          <a
            href="/"
            className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
            aria-current="page"
          >
            Sign up to alerts about disruption
          </a>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
