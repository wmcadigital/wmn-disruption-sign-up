/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

function Table({ title, caption, headers, values, classes, cellClasses }) {
  const noHeadersClass = headers && headers.lenght > 0 ? '' : 'wmnds-table--without-header';

  return (
    <>
      {title && <h3>{title}</h3>}
      <table className={`wmnds-table ${classes} ${noHeadersClass}`}>
        {caption && <caption className="wmnds-table__caption">{caption}</caption>}
        {headers && headers.lenght > 0 && (
          <thead>
            <tr>
              {headers.map((value, index) => {
                return (
                  <th scope="col" key={index}>
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>
        )}

        {values && (
          <tbody>
            {values.map((line, lineIndex) => {
              return (
                <tr key={`line${lineIndex}`}>
                  {line.map((col, index) => {
                    if (index === 0)
                      return (
                        <th
                          key={index}
                          scope="row"
                          className={cellClasses[index]}
                          data-header={headers[index]}
                        >
                          {col}
                        </th>
                      );
                    return (
                      <td key={index} className={cellClasses[index]} data-header={headers[index]}>
                        {col}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.element),
  values: PropTypes.arrayOf(arrayOf(PropTypes.element)),
  classes: PropTypes.string,
  cellClasses: PropTypes.arrayOf(PropTypes.string),
};
Table.defaultProps = {
  headers: [],
  values: [[]],
  title: null,
  caption: null,
  classes: null,
  cellClasses: null,
};

export default Table;
