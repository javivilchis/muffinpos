import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import spinner from '../../assets/spinner.gif';
import Spinner from 'react-bootstrap/Spinner';
import Cart from '../Cart';
import CategoryMenu from '../CategoryMenu';
import MainNav from '../MainNav';
import Cheugy from '../Cheugy';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }
  const style = {
    prodList: {
      marginTop: '8rem',
    },
  };
  return (
    <div className="container-fluid">
      <div className="row d-flex p-0 m-0">
        <div className="col-12 col-md-3 p-0">
          <Cart />
          <Cheugy />
        </div>
        <div className="col-12 col-md-9 p-0">
          <div className="row">
            <MainNav />
            <div className="col-12 my-2">
              <div style={{ position: 'relative', width: '100%' }}>
                <CategoryMenu />

              </div>

              <div className="my-2">
                {state.products.length ? (
                  <div className="flex-row p-2 " style={style.prodList}>
                    {filterProducts().map((product) => (
                      <ProductItem
                        key={product._id}
                        _id={product._id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                      />
                    ))}
                  </div>
                ) : (
                  <h3>Add some products first!</h3>
                )}
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
