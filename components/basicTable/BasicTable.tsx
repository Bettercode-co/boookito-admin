import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./columns";
import { DATA } from "./dataRow";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
// import "./BasicTable.css";


const BasicTable = () => {
  const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const response = await axios
  //     .get("https://fakestoreapi.com/products")
  //     .catch((err) => console.log(err));
  //   if (response) {
  //     const products = response.data;
  //     setProducts(products);
  //     console.log(products);
  //   }
  // };

  const fetchData = async () => {
     await fetch("https://fakestoreapi.com/products")
    .then(res => res?.json())
    .then(res => setProducts(res))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = useMemo(() => DATA, []);
  const columns = useMemo(() => COLUMNS, []);

  const tableInstanse = useTable(
    { data, columns },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
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
    <div dir="rtl" >
      <div className="searchBarContainer mt-5">
      <div>
        search: 
        <input className="w-1/3 px-4 py-2 mr-10 border-t-0 border-l-0 border-r-0 border-b-slate-400 bg-transparent  border-gray-400 outline-none focus:outline-none" type="text" value={globalFilter || ""} onChange={e => setGlobalFilter(e.target.value)} />
    </div>
      </div >
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-fit flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
                <div className="bg-white shadow-md rounded my-6"></div>
      <table className="w-full text-gray-800 dark:text-gray-400 text-right" {...getTableProps()}>
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (          
            <tr className="bg-gray-300  text-gray-600 uppercase text-sm leading-normal" key={headerGroup}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="py-6 px-10 text-right" key={headerGroup} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ">" : "<") : ""}
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
              <tr className="border-b border-gray-200 hover:bg-gray-100 bg-white" key={row} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="py-3 px-6 text-right" key={cell} {...cell.getCellProps()}> {cell.render("Cell")} </td>
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


      <div className="text-center ">
        <span className="mx-5 mt-3">page: {pageIndex + 1} of {pageOptions.length}</span>
        <button className="w-20 py-1 rounded-md text-slate-700 cursor-pointer bg-violet-300 mx-5 mt-3" onClick={() => nextPage} disabled={!canNextPage} >next</button>
        <button className="w-20 py-1 rounded-md text-slate-700 cursor-pointer bg-violet-300 mx-5 mt-3" onClick={() => previousPage} disabled={!canPreviousPage} >previous</button>
      </div>
    </div>
  );
};

export default BasicTable;
