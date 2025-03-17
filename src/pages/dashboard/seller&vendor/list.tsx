import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PiPencilSimpleBold } from 'react-icons/pi';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface User {
  sellerId: string;
  image: string;
  storeName: string;
  email: string;
  grossScale: number;
  earning: number;
}

interface ListProps {
  users: User[];
}

const List: React.FC<ListProps> = ({ users }) => {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'sellerId',
      header: 'Seller ID',
    },

    {
      accessorKey: 'storeName',
      header: 'Store Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'grossScale',
      header: 'Gross Scale',
    },
    {
      accessorKey: 'earning',
      header: 'Earning',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: () => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="h-8 w-8 p-0 hover:bg-pink-100 rounded-lg flex items-center justify-center">
              <HiOutlineDotsVertical className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" className="bg-white shadow-md p-2 rounded-md">
              <DropdownMenu.Label className="text-center text-base">Actions</DropdownMenu.Label>
              <DropdownMenu.Item className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <RiDeleteBin6Line className="size-6 bg-red-100 rounded-full p-1 text-red-500" />
                Delete Seller
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <PiPencilSimpleBold className="size-6 bg-blue-100 rounded-full p-1 text-blue-500" />
                Edit Seller
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="mt-12 shadow-md rounded-lg border">
      {/* Search Input */}
      <div className="m-6">
        <label htmlFor="search-products" className="sr-only">
          Search Products
        </label>
        <input
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          id="search-products"
          type="search"
          placeholder="Search products"
          className="p-2 border w-96 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce] "
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border text-center text-sm border-gray-300 rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-gray-700 px-8 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 text-gray-700 px-10">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex justify-between items-center px-4 py-2">
          <select
            name=""
            id=""
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {[10, 15, 20].map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mx-2">
          <button
            className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 mx-2 disabled:opacity-50 diabled:bg-gray-300"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardDoubleArrowLeft size={20} />
          </button>
          <button
            className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 disabled:opacity-50 diabled:bg-gray-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardArrowLeft size={20} />
          </button>

          <span className="flex items-center mx-2">
            <input
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-10 px-2 py-1 border border-gray-300 rounded-md text-center"
              min={1}
              max={table.getPageCount()}
            />
            <span className="pl-2"> of {table.getPageCount()}</span>
          </span>

          <button
            className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 disabled:opacity-50 diabled:bg-gray-300 mx-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <MdKeyboardArrowRight size={20} />
          </button>
          <button
            className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 disabled:opacity-50 diabled:bg-gray-300"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <MdKeyboardDoubleArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
