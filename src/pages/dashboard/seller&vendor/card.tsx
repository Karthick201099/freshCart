import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
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

interface CardProps {
  users: User[];
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'storeName', header: 'Store Name' },
  { accessorKey: 'sellerId', header: 'Seller ID' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'grossScale', header: 'Gross Sale' },
  { accessorKey: 'earning', header: 'Earning' },
];

const Card: React.FC<CardProps> = ({ users }) => {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 6 } }, // Show 9 unique cards per page
  });

  return (
    <div className="mt-12 text-center">
      {/* Card Grid */}
      <div className="grid grid-cols-3 gap-7">
        {table.getRowModel().rows.map((row) => {
          const user = row.original;
          return (
            <div
              key={user.sellerId}
              className="p-4 border rounded-xl shadow-inherit hover:border-2 hover:shadow-xl hover:border-green-200 bg-white text-center"
            >
              <div className="flex justify-center items-center">
                <img
                  src={user.image}
                  alt={user.storeName}
                  className="w-16 h-16 rounded-full mb-3 mt-2"
                />
              </div>
              <h2 className="text-lg font-semibold">{user.storeName}</h2>
              <p className="text-gray-500 py-2">{user.sellerId}</p>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex justify-around mt-8">
                <div>
                  <p className="text-gray-500">Gross Sale</p>
                  <h2 className="font-medium text-xl">${user.grossScale}</h2>
                </div>
                <div>
                  <p className="text-gray-500">Earning</p>
                  <h2 className="font-medium text-xl">${user.earning}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
            {[6, 9, 12, 15].map((item) => (
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

export default Card;
