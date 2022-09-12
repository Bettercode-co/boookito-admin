import React, { useEffect, useMemo, useState } from "react";
import PN from "persian-number";

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
  // const [products, setProducts] = useState([]);


  // const fetchData = async () => {
  //   await fetch("https://fakestoreapi.com/products")
  //     .then((res) => res?.json())
  //     .then((res) => setProducts(res))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const data = useMemo(() => rowsdata, [rowsdata]);
  const columns = useMemo(() => columnsData, [columnsData]);


  const tableInstanse = useTable(
    { data, columns },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstanse;

  const { globalFilter, pageIndex } = state;

  return (
    <div dir="rtl">
      <div className="searchBarContainer mt-8 lg:mt-0 relative flex  gap-2 ">
          <span className="pr-0 lg:pr-10 self-center text-3xl"><RiSearchLine /> </span>
          <input
            className=' h-12 w-full lg:w-96 border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent'
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
      </div>
      <div className="overflow-auto">
        <div className="min-w-screen min-h-fit  bg-gray-100 ">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6"></div>
            <table
              className="w-full text-gray-800 dark:text-gray-400 text-right"
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
                        className="py-6 px-10 text-right"
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
                            className="py-3 px-6 text-right"
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
              {/* <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr key={footerGroup} {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td key={column} {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
            </table>
          </div>
        </div>
      </div>

      {/* <div className="text-center pb-8">
        <button
          className="w-20 py-1 rounded-md text-slate-700 cursor-pointer bg-violet-300 mx-5 mt-3 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => nextPage}
          disabled={!canNextPage}
        >
          بعد
        </button>
        <button
          className="w-20 py-1 rounded-md text-slate-700 cursor-pointer bg-violet-300 mx-5 mt-3 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => previousPage}
          disabled={!canPreviousPage}
        >
          قبل
        </button>
        <span className="mx-5 mt-3 text-slate-700">
          صفحه : {PN.convertEnToPe(pageIndex + 1)} از {PN.convertEnToPe(pageOptions.length)}
        </span>
      </div> */}
    </div>
  );
};

export default BasicTable;
