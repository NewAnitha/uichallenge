import { useTable } from "react-table";

function Subtable({ columns, data }) {
    // console.log(data[0],"dattttttttta");
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table and the styles
  return (
  <div className="mt-2 flex flex-col mb-40">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow  border-b border-black-500 sm:rounded-lg">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 border border-2 ">
                      <thead className="bg-gray-10">
                      {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                  <th {...column.getHeaderProps()}
                                  className=" px-6 py-5 text-left text-20 font-medium text-blue-400 uppercase rounded-sm tracking-wider border border-2"
                                  >
                                    {column.render("Header")}
                                    </th>
                              ))}
                          </tr>
                      ))}
                  </thead>
                  <tbody {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200 border border-2">
                    {rows.map((row, i) => {
                      prepareRow(row);
                      return (
                          <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                              return <td {...cell.getCellProps()} className="px-6 py-10 whitespace-nowrap border border-2">{cell.render("Cell")}</td>
                          })}
                          </tr>
                      );
                      })}
                  </tbody>
                    </table>
                </div>
              </div>
          </div>
         </div>
  );
}

export default Subtable;
//Filtering on tag and metric value For numeric columns range based filtering should be allowed Ex : User should be able to express filters like (value > x & value < y) ?

