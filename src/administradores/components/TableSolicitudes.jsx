import React from 'react';
import { useTable } from 'react-table';

export const TableSolicitudes = ({data, columns}) => {
    // Configuración de la tabla
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });
  
    return (
      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="table-header-row">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="table-header-cell">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-body">
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="table-row">
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="table-cell">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  <td>Hola</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  
