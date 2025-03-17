import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout';
import Home from '@/pages/dashboard/home';
import Products from '@/pages/dashboard/products/products';
import Categories from '@/pages/dashboard/categories/categories';
import Orders from '@/pages/dashboard/orders';
import Addproduct from './pages/dashboard/products/addproduct';
import Addcategory from './pages/dashboard/categories/addcategory';
import Vendors from './pages/dashboard/seller&vendor/vendors';
import Card from './pages/dashboard/seller&vendor/card';
import List from './pages/dashboard/seller&vendor/list';
import Customer from './pages/dashboard/customer';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="vendorCard" element={<Card users={[]} />} />
            <Route path="vendorList" element={<List users={[]} />} />
            <Route path="customer" element={<Customer />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
