import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BsCurrencyDollar, BsLightbulb } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuShoppingCart } from 'react-icons/lu';

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexCharts.ApexOptions;
}

type Order = {
  id: string;
  name: string;
  date: string;
  price: string;
  status: string;
};

const Home: React.FC = () => {
  const [state] = useState<ChartState>({
    series: [
      { name: 'Total Income', data: [31, 40, 28, 51, 42, 67, 100] },
      { name: 'Total Expense', data: [80, 50, 30, 70, 40, 44, 41] },
    ],
    options: {
      chart: { height: 350, type: 'area' },
      colors: ['#28a745', '#ffc107'], // Green (Income), Yellow (Expense)
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 95, 100],
          colorStops: [
            // Green (Income)
            [
              { offset: 0, color: '#28a745', opacity: 0.4 },
              { offset: 100, color: '#28a745', opacity: 0.1 },
            ],
            // Yellow (Expense)
            [
              { offset: 0, color: '#ffc107', opacity: 0.4 },
              { offset: 100, color: '#ffc107', opacity: 0.1 },
            ],
          ],
        },
      },
      markers: {
        size: 5,
        colors: ['#28a745', '#ffc107'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 7 },
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2024-01-01T00:00:00.000Z',
          '2024-02-01T00:00:00.000Z',
          '2024-03-01T00:00:00.000Z',
          '2024-04-01T00:00:00.000Z',
          '2024-05-01T00:00:00.000Z',
          '2024-06-01T00:00:00.000Z',
          '2024-07-01T00:00:00.000Z',
        ],
      },
      tooltip: {
        shared: true,
        x: { format: 'MMM' },
        y: {
          formatter: (value) => `${value}`,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
    },
  });

  // pie charts
  const series = [44, 55, 13, 33];

  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 400,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Sales',
              fontSize: '18px',
              fontWeight: 600,
              color: '#2c3e50',
              formatter: () => '146',
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      offsetY: 0,
      height: 0,
    },
  };

  const orders: Order[] = [
    {
      id: '#FC0005',
      name: "Haldiram's Sev Bhujia",
      date: '28 March 2023',
      price: '$18.00',
      status: 'Shipped',
    },
    {
      id: '#FC0004',
      name: 'NutriChoice Digestive',
      date: '24 March 2023',
      price: '$24.00',
      status: 'Pending',
    },
    {
      id: '#FC0003',
      name: 'Onion Flavour Potato',
      date: '8 Feb 2023',
      price: '$9.00',
      status: 'Cancel',
    },
    {
      id: '#FC0002',
      name: 'Blueberry Greek Yogurt',
      date: '20 Jan 2023',
      price: '$12.00',
      status: 'Pending',
    },
    {
      id: '#FC0001',
      name: 'Slurpp Millet Chocolate',
      date: '14 Jan 2023',
      price: '$8.00',
      status: 'Processing',
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Shipped':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancel':
        return 'bg-red-100 text-red-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="lg:p-4 p-1 my-6">
      <div className="bg-[url('../assets/slider-image-1.jpg')] bg-cover bg-center lg:h-64 h-44 w-full rounded-xl lg:pt-12 pt-4 lg:pl-8 pl-7">
        <h1 className="lg:text-[39px] text-3xl font-semibold">Welcome back! FreshCart</h1>
        <p className=" text-[15px] font-medium text-gray-600 pt-2 ">
          FreshCart is a simple & clean design for developers and designers.
        </p>
        <button className="bg-green-500 text-white p-2 hover:bg-green-600 rounded-md font-medium mt-4">
          Create Product
        </button>
      </div>

      <div className="flex overflow-x-auto lg:overflow-visible md:py-6 gap-4 lg:gap-9 mt-8 snap-x snap-mandatory lg:flex-nowrap">
        <div className="shadow-md border rounded-lg w-full sm:w-[400px] lg:w-full  p-5 min-w-full snap-center lg:min-w-[200px]">
          <div className="flex items-center justify-between ">
            <h2 className="font-semibold text-xl">Earnings</h2>
            <div className="bg-[#f8d6d6] p-2 rounded-full">
              <BsCurrencyDollar size={20} />
            </div>
          </div>
          <h1 className="font-bold text-2xl  pt-4">$93,438.78</h1>
          <p className="text-gray-500 pt-1">Monthly revenue</p>
        </div>

        <div className="shadow-md border rounded-lg w-full sm:w-[400px] lg:w-full  p-5 min-w-full snap-center lg:min-w-[200px]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl">Orders</h2>
            <div className="bg-[#fff3cd] p-2 rounded-full">
              <LuShoppingCart size={20} />
            </div>
          </div>
          <h1 className="font-bold text-2xl pt-4">42,339</h1>
          <p className="text-gray-500 pt-1">
            <span className="text-black">35+ </span>New Sales
          </p>
        </div>

        <div className="shadow-md border rounded-lg w-full sm:w-[400px] lg:w-full p-5 min-w-full snap-center lg:min-w-[200px]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl">Customer</h2>
            <div className="bg-[#cce1fe] p-2 rounded-full">
              <FaUserFriends size={20} />
            </div>
          </div>
          <h1 className="font-bold text-2xl pt-4">$93,438.78</h1>
          <p className="text-gray-500 pt-1">
            <span className="text-black">30+ </span>new in 2 days
          </p>
        </div>
      </div>

      <div className="pt-8 lg:flex block justify-between ">
        <div className="p-4 rounded-lg shadow-md border lg:w-[65%] w-full">
          <div className="flex justify-between pb-4">
            <div>
              <h1 className="font-bold text-xl">Revenue</h1>
              <p>(+63%) than last year</p>
            </div>
            <div>
              <select
                id="options"
                name="options"
                className="block  px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="option1">2019</option>
                <option value="option2">2020</option>
                <option value="option3">2021</option>
                <option value="option3">2022</option>
                <option value="option3">2023</option>
              </select>
            </div>
          </div>
          <div id="chart">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="area"
              height={350}
            />
          </div>
          <div id="html-dist"></div>
        </div>
        <div className="p-3 rounded-lg shadow-md border lg:mt-0 mt-7 lg:w-[32%] w-full">
          <h1 className="font-bold text-xl pb-10">Total Sales</h1>
          <div id="chart" className="">
            <ReactApexChart options={options} series={series} type="donut" width={380} />
          </div>
        </div>
      </div>
      <div className="lg:flex block gap-9 mt-8">
        <div className="space-y-4 px-5 py-8 bg-white rounded-lg shadow lg:w-[48%] w-full ">
          <h2 className="text-lg font-semibold pb-4">Sales Overview</h2>

          {/* Total Profit */}
          <div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Profit</span>
              <span>$1,619 (8.6%)</span>
            </div>
            <div className="w-full rounded-full h-2 bg-green-100">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '8.6%' }}></div>
            </div>
          </div>

          {/* Total Income */}
          <div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Income</span>
              <span>$3,571 (86.4%)</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '86.4%' }}></div>
            </div>
          </div>

          {/* Total Expenses */}
          <div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Expenses</span>
              <span>$3,430 (74.5%)</span>
            </div>
            <div className="w-full bg-red-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '74.5%' }}></div>
            </div>
          </div>
        </div>
        <div className="lg:w-[48%] w-full lg:pt-0 pt-7">
          <div className="flex gap-4 p-6 rounded shadow-md border items-center ">
            <div className="">
              <IoMdNotificationsOutline color="gold" size={48} />
            </div>
            <div>
              <h1 className="font-semibold pb-1">Start your day with New Notification.</h1>
              <p className="text-gray-500">
                You have <span className="text-blue-500">2 new notification</span>
              </p>
            </div>
          </div>
          <div className="flex gap-5 p-6 rounded shadow-md border  mt-5 items-center">
            <div className="">
              <BsLightbulb color="green" size={36} />
            </div>
            <div>
              <h1 className="font-semibold pb-1">Monitor your Sales and Profitability</h1>
              <p className="text-gray-500">
                You have <span className="text-blue-500">View Performance</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" border rounded-lg shadow-lg mt-8  ">
        <h1 className="p-4 font-semibold">Rcent Order</h1>
        <div className=" overflow-x-auto ">
          <table className="lg:min-w-full min-w-[1000px] bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Order Number</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Order Date</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className={' hover:bg-gray-100  bg-white'}>
                  <td className="px-4 py-3  text-gray-700">{order.id}</td>
                  <td className="px-4 py-3  text-gray-700">{order.name}</td>
                  <td className="px-4 py-3  text-gray-700">{order.date}</td>
                  <td className="px-4 py-3  text-gray-700">{order.price}</td>
                  <td className="px-4 pt-3 pb-5 ">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-lg ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
