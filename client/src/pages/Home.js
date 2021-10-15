import React from 'react';
import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';

const Home = () => {
  if (Auth.loggedIn()) {
    return (
      <div>
        {/* <CategoryMenu /> */}
        <ProductList />
        {/* <Cart /> */}
     </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Home;