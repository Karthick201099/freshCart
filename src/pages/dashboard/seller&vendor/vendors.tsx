import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BsListTask } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Card from './card';
import List from './list';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type User = {
  sellerId: string;
  image: string;
  storeName: string;
  email: string;
  grossScale: number;
  earning: number;
};

const users: User[] = [
  {
    sellerId: '#01',
    image: '/assets/stores-logo-6.svg',
    storeName: 'BigBasket',
    email: 'lizin@armyspy.com',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#02',
    image: '/assets/stores-logo-6.svg',
    email: 'liturname@einrot.com',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#03',
    image: '/assets/stores-logo-6.svg',
    storeName: 'Online Grocery Mart',
    email: 'werve1962@superrito.com',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#04',
    image: '/assets/stores-logo-6.svg',
    email: 'DealShare Mart',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#05',
    image: '/assets/stores-logo-6.svg',
    email: 'liturname@einrot.com',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#06',
    image: '/assets/stores-logo-6.svg',
    email: 'liturname@einrot.com',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#07',
    image: '/assets/stores-logo-6.svg',
    email: 'liturname@einrot.com',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#08',
    image: '/assets/stores-logo-6.svg',
    email: 'liturname@einrot.com',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
  {
    sellerId: '#09',
    image: '/assets/stores-logo-6.svg',
    email: 'liturname@einrot.com',
    storeName: 'BigBasket',
    grossScale: 24,
    earning: 120.0,
  },
];

const Vendors = () => {
  const navigate = useNavigate();
  const query = useQuery().get('status') || 'card';
  const [view, setView] = useState<'card' | 'list'>(query as 'card' | 'list');

  useEffect(() => {
    if (!query) {
      navigate('/vendors?status=card');
    } else {
      setView(query as 'card' | 'list');
    }
  }, [query, navigate]);

  return (
    <div className="p-4 my-6 ">
      <h1 className="font-semibold text-3xl">Vendors</h1>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-[16px] text-gray-500">
          <Link to="/" className="font-medium text-gray-500 hover:text-green-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          Sellers
        </p>
        <div className="flex gap-1">
          <button
            className={`${view === 'card' ? 'bg-green-500 text-white ' : 'bg-gray-200 text-black hover:bg-gray-300  '} p-3 rounded-lg `}
            onClick={() => navigate('/vendors?status=card')}
          >
            <RxDashboard size={16} />
          </button>
          <button
            className={`${view === 'list' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'} p-3 rounded-lg`}
            onClick={() => navigate('/vendors?status=list')}
          >
            <BsListTask size={16} />
          </button>
        </div>
      </div>

      <div className="">{view === 'card' ? <Card users={users} /> : <List users={users} />}</div>
    </div>
  );
};

export default Vendors;
