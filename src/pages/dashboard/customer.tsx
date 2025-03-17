import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  CellContext,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PiPencilSimpleBold } from 'react-icons/pi';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

type Product = {
  id: number;
  image: string;
  name: string;
  email: string;
  spent: number;
  phone: number;
  date: string;
  time: string;
};

const data: Product[] = [
  {
    id: 1,
    image: './public/assets/avatar-1.jpg',
    name: 'Bonnie Howe',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 2,
    image: './public/assets/avatar-1.jpg',
    name: 'Judy Nelson',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 3,
    image: './public/assets/avatar-1.jpg',
    name: 'John Mattox',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 4,
    image: './public/assets/avatar-1.jpg',
    name: 'Wayne Rossman',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 5,
    image: './public/assets/avatar-1.jpg',
    name: 'Rhonda Pinson',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 6,
    image: './public/assets/avatar-1.jpg',
    name: 'Rhonda Pinson',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 7,
    image: './public/assets/avatar-1.jpg',
    name: 'Rhonda Pinson',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 8,
    image: './public/assets/avatar-1.jpg',
    name: 'John Mattox',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 9,
    image: './public/assets/avatar-1.jpg',
    name: 'Rhonda Pinson',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
  {
    id: 10,
    image: './public/assets/avatar-1.jpg',
    name: 'John Mattox',
    email: 'waynerossman@gmail.com',
    spent: 35,
    phone: 9655734005,
    date: '27 April, 2023',
    time: '2:47pm',
  },
];

const Customer: React.FC = () => {
  const [selectedRows, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const navigate = useNavigate();
  console.log(selectedRows);
  const columns: ColumnDef<Product>[] = [
    {
      id: 'selection',
      header: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }: CellContext<Product, unknown>) => (
        <div className="flex  items-center gap-3">
          <img
            src={row.original.image}
            alt={row.original.name}
            width={20}
            height={20}
            className="rounded-full"
          />
          <p>{row.original.name}</p>
        </div>
      ),
    },

    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }: CellContext<Product, unknown>) => (
        <div className="">
          <p>
            {row.original.date} at {row.original.time}
          </p>
          <span></span>
        </div>
      ),
    },
    { accessorKey: 'phone', header: 'Phone' },

    {
      accessorKey: 'spent',
      header: 'Spent',
      cell: ({ row }: CellContext<Product, unknown>) => <p>${row.original.spent}</p>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0 hover:bg-pink-100 rounded-lg flex items-center justify-center">
              <HiOutlineDotsVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-md p-2 rounded-md">
            <DropdownMenuLabel className="text-center text-base">Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <RiDeleteBin6Line className="size-6 bg-red-100 rounded-full p-1 text-red-500" />
              Delete Package
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <PiPencilSimpleBold className="size-6 bg-blue-100 rounded-full p-1 text-blue-500" />
              Edit Package
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection: selectedRows,
      globalFilter,
    },
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const addproducts = () => {
    navigate('/addproduct');
  };

  return (
    <div className="p-4 my-6">
      <h1 className="font-semibold text-3xl">Customers</h1>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-[16px] text-gray-500">
          <Link to="/" className="font-medium text-gray-500 hover:text-green-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          Customers
        </p>
        <button
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500"
          onClick={() => {
            addproducts();
          }}
        >
          Add New Customer
        </button>
      </div>

      <div className="mt-10 rounded-tl-lg rounded-tr-lg shadow">
        <div className="flex justify-between items-center px-4 py-8">
          <div>
            <label htmlFor="search-products" className="sr-only">
              Search Products
            </label>
            <input
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              id="search-products"
              type="search"
              placeholder="Search products"
              className="ml-4 p-2 border w-96 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce] "
            />
          </div>
        </div>
        <table className="w-full border-collapse border text-center text-sm border-gray-300 rounded-lg">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-gray-700 px-8">
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
      </div>
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

type IndeterminateCheckboxProps = {
  indeterminate?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
  indeterminate,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} className="cursor-pointer w-3.5 h-3.5" />;
};

export default Customer;
