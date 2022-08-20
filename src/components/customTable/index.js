import React from "react";

export default function CustomTable({ rows, headers, onClickRow }) {
  return (
    <table className="detailstable">
      <thead>
        <tr>
          {headers?.map((header, index) => (
            <th key={index} className="tableCell">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((item, index) => (
          <tr key={index} onClick={() => onClickRow(item)}>
            {headers?.map((header, ind) => (
              <td key={ind} className="tableCell">
                {item[header?.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
