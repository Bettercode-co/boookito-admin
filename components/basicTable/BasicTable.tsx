import React, {  useMemo } from "react";
import { useRouter } from "next/router";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";


const BasicTable = ({rowsdata, columnsData}) => {
  const router = useRouter()

  const data = useMemo(() => rowsdata, [rowsdata]);
  const columns = useMemo(() => columnsData, [columnsData]);


  const tableInstanse = useTable(
    { data, columns, initialState: { pageSize: router.pathname === '/admin/categories' || router.pathname === '/admin/books' ? 1500 : 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination,

  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstanse;

  const { globalFilter } = state;

  return (
    <div dir="rtl">
      {router.pathname === '/admin/categories' && (<div className="searchBarContainer mt-8 lg:mt-0 relative flex  gap-2 ">
          <span className="pr-0 lg:pr-10 self-center text-3xl"><RiSearchLine /> </span>
          <input
            className='mt-4 h-10 rounded-lg w-full lg:w-96 border-slate-400 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent'
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
      </div>)}
      <div className="overflow-auto">
        <div className="min-w-screen min-h-fit  bg-gray-100 ">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6"></div>
            <table
              className="w-full text-gray-800 dark:text-gray-400 text-center"
              {...getTableProps()}
            >
              <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup) => (
                  <tr
                    className="bg-gray-300  text-gray-600 uppercase text-sm leading-normal"
                    key={headerGroup}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        className="py-6 px-10 text-center"
                        key={headerGroup}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <IoMdArrowDropup />
                            ) : (
                              <IoMdArrowDropdown />
                            )
                          ) : null}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-gray-700 " {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100 bg-white"
                      key={row}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="py-3 px-6 text-center"
                            key={cell}
                            {...cell.getCellProps({
                              style: {
                                minWidth: cell.column.minWidth,
                              },
                            })}
                          >
                            {" "}
                            {cell.render("Cell")}{" "}
                          </td>
                        );
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
};

export default BasicTable;
