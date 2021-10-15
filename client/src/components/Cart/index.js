import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
//import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }
  const style = {
    sidebar: {
      position: 'fixed',
      top: '51px',
      bottom: 0,
      left: 0,
      zIndex: 1000,
      display: 'block',
      padding: '20px',
      overflowX: 'hidden',
      overflowY: 'hidden',
      borderRight: '1px solid #eee',
      width: '5rem',
    },
    total: {
      fontSize: '2rem',
      textAlign: 'center',
      color: '#888888',
    },
    order: {
      color: '#333',
      textAlign: 'center',
    },
  };

  return (
    <div className="col-m-12 px-sm-4 px-0 bg-light d-flex sticky-top min-vh-100 w-auto">
      <div className="d-flex flex-sm-column w-100 align-items-center align-items-sm-start pt-2 text-white">
        <h2 style={style.order} className="text-center">
          Order Summary
        </h2>
        {state.cart.length ? (
          <div className="w-100">
            <ul className="list-group mb-3">
              {state.cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ul>
            <div className="p-4 border-top" style={style.total}>
              <strong>Total: ${calculateTotal()}</strong>
            </div>
            <div className="p-2 w-100 mt-auto align-self-end ">
              {Auth.loggedIn() ? (
                <button
                  className="btn-warning btn-lg btn-block w-100 p-4"
                  onClick={submitCheckout}
                >
                  Proceed To Payment
                </button>
              ) : (
                <div className="bg-danger p-4 text-center">
                  <h2 className="text-white">(log in to check out)</h2>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="toast">
            <h2 style={style.order}>
              You haven't added anything to your cart yet!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
