import { useState } from 'react';
import { AiOutlineStar, AiOutlineUsergroupAdd } from 'react-icons/ai';
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiSolidQuoteSingleLeft,
} from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { HiArrowTurnLeftDown } from 'react-icons/hi2';
import { IoIosList } from 'react-icons/io';
import { IoBagOutline } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { MdBroadcastOnHome, MdChecklistRtl } from 'react-icons/md';
import { PiShoppingCartSimpleDuotone } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  isCollapsed: boolean;
}

const Sidebar = ({ isOpen, toggleSidebar, toggleCollapse, isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [openDropdown, setOpenDropdown] = useState(false);
  console.log(isCollapsed);
  return (
    <div
      className={`lg:fixed absolute z-30 top-0 left-0 h-dvh  bg-gray-50 border text-gray-600 transition-transform duration-300  ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-20 ' : 'w-64'}`}
    >
      <button
        className="absolute -right-4 top-7 bg-gray-200 p-1 rounded-full shadow-md hover:bg-gray-300 transition-all duration-300"
        onClick={toggleCollapse}
      >
        {isCollapsed ? <BiChevronLeft size={20} /> : <BiChevronRight size={20} />}
      </button>

      <button
        className="absolute right-4 top-6 text-gray-500 lg:hidden block"
        onClick={toggleSidebar}
      >
        <FiX size={30} />
      </button>
      <button className={`pt-6 lg:pl-6 pl-2 `}>
        {isCollapsed ? (
          <PiShoppingCartSimpleDuotone
            size={24}
            className="text-[#6ca56c] mt-2 hover:text-[#3f643f]"
          />
        ) : (
          <img src="./public/assets/freshcart-logo.svg" alt="" className=" lg:w-40 w-36 " />
        )}
      </button>

      <nav className=" p-4">
        <ul className="space-y-4">
          <li className={`${isCollapsed ? 'pt-3 relative flex items-center' : ''}`}>
            <Link
              to="/"
              className={`${
                pathname == '/' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''
              } flex items-center p-2 hover:bg-[#ceefce] rounded`}
            >
              {/* Wrap Icon and Tooltip inside a div with `group` */}
              <div className="relative group">
                <FaHome className={`${isCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />

                {/* Tooltip (Only Visible When isCollapsed) */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Dashboard
                  </span>
                )}
              </div>

              {/* Show text only when not collapsed */}
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>

          <p className={`text-gray-500 text-sm ${isCollapsed ? 'hidden' : 'block'}`}>
            Store Managements
          </p>
          <li className={`${isCollapsed ? 'relative flex items-center ' : ''}`}>
            <Link
              to="/product"
              className={`${pathname == '/product' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''} flex items-center p-2 hover:bg-[#ceefce] rounded ${isCollapsed ? '' : 'mt-4'} `}
            >
              <div className="relative group">
                <LuShoppingCart className={`${isCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Products
                  </span>
                )}
              </div>

              {!isCollapsed && <span>Products</span>}
            </Link>
          </li>
          <li className={`${isCollapsed ? ' relative flex items-center ' : ''}`}>
            <Link
              to="/categories"
              className={`${pathname == '/categories' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''} flex items-center p-2 hover:bg-[#ceefce] rounded`}
            >
              <div className="relative group">
                <IoIosList className={`${isCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Categories
                  </span>
                )}
              </div>

              {!isCollapsed && <span>Categories</span>}
            </Link>
          </li>
          <li className="relative">
            <Link to="/orders" className={`flex items-center py-2 px-1 hover:bg-[#e3e4e3] rounded`}>
              <button
                className="flex justify-between items-center w-full  rounded-md"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <span className="flex items-center ">
                  <div className="relative  group">
                    <IoBagOutline className={`${isCollapsed ? 'mr-1' : 'mr-2'}`} size={20} />
                    {isCollapsed && (
                      <span className="absolute left-full ml-2 top-1/2   -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                        Orders
                      </span>
                    )}
                  </div>
                  {!isCollapsed && <span>Orders</span>}
                </span>
                <BiChevronDown
                  className={`transition-transform duration-300 ${openDropdown ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
            </Link>

            <ul
              className={`mt-2 overflow-hidden transition-all duration-700 ease-in-out  ${
                openDropdown ? 'max-h-40 opacity-100 pb-3' : 'max-h-0 opacity-0'
              } ${isCollapsed ? '' : ' ml-4  pl-5'}}`}
            >
              {[
                { name: 'List', icon: <MdChecklistRtl size={20} />, path: '/orders' },
                { name: 'Single', icon: <BiSolidQuoteSingleLeft size={20} />, path: '/' },
              ].map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <li
                    key={index}
                    className={` transition-all duration-500 ease-in-out  ${
                      openDropdown
                        ? `opacity-100 translate-y-2 delay-200`
                        : 'opacity-0 -translate-y-2 delay-200'
                    }`}
                  >
                    <Link
                      to={item.path}
                      className={` p-2 mt-1 flex rounded transition-colors ${
                        isActive ? 'bg-[#ceefce] text-green-800' : 'hover:bg-[#ceefce]'
                      }`}
                    >
                      <span className={`${isCollapsed ? 'mr-0 pl-1' : 'mr-2'} mt-1 `}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className={`${isCollapsed ? ' relative flex items-center ' : ''}`}>
            <Link
              to="/vendors"
              className={`${pathname == '/vendors' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''} flex items-center p-2 hover:bg-[#ceefce] rounded`}
            >
              <div className="relative group">
                <MdBroadcastOnHome className={`${isCollapsed ? 'mr-0 r' : 'mr-2'}`} size={20} />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Sallers / Vendors
                  </span>
                )}
              </div>
              {!isCollapsed && <span>Sallers / Vendors</span>}
            </Link>
          </li>
          <li className={`${isCollapsed ? 'relative flex items-center ' : ''}`}>
            <Link
              to="/customer"
              className={`${pathname == '/customer' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''} flex items-center p-2 hover:bg-[#ceefce] rounded`}
            >
              <div className="relative group">
                <AiOutlineUsergroupAdd className={`${isCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Customers
                  </span>
                )}
              </div>
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Customers</span>
            </Link>
          </li>
          <li className={`${isCollapsed ? 'relative flex items-center ' : ''}`}>
            <Link
              to=""
              className={`${pathname == '' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''} flex items-center p-2 hover:bg-[#ceefce] rounded`}
            >
              <div className="relative group">
                <AiOutlineStar className={`${isCollapsed ? 'mr-0 ' : 'mr-2'}`} size={20} />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Reviews
                  </span>
                )}
              </div>
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Reviews</span>
            </Link>
          </li>
          <li className={`${isCollapsed ? 'relative flex items-center ' : ''}`}>
            <Link
              to=""
              className={`${pathname == '' ? 'bg-[#ceefce] text-green-800 hover:bg-[#ceefce]' : ''} flex items-center p-2 hover:bg-[#ceefce] rounded`}
            >
              <div className="relative group">
                <HiArrowTurnLeftDown className={`${isCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                    Menu Level
                  </span>
                )}
              </div>
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Menu Level</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
