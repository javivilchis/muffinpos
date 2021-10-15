import React from 'react';

import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

import { style } from 'dom-helpers';

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });

      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  const onIncrement = () => {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: item.purchaseQuantity + 1,
    });
    idbPromise('cart', 'put', {
      ...item,
      purchaseQuantity: item.purchaseQuantity + 1,
    });
  };

  const onDecrement = () => {
    var updatedPurchaseQuantity = Math.max(1, item.purchaseQuantity - 1);
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: updatedPurchaseQuantity,
    });
    idbPromise('cart', 'put', {
      ...item,
      purchaseQuantity: updatedPurchaseQuantity,
    });
  };

  const style = {
    list: {
      fontSize: '1.2em',
      overflow: 'hidden',
      textAlign: 'center',
    },
    name: {
      fontSize: '0.8em',
      textAlign: 'center',
    }
  };

  return (
    <div className="p-0 m-0">
      <li className="list-group-item d-flex justify-content-between p-2 mb-1 shadow">
        <div className="btn-group-vertical" role="group">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={onIncrement}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={onDecrement}
          >
            -
          </button>
        </div>
        <div className="col-6">
        <div className="p-2 w-180 ">
          <h6 className="my-0" style={style.name}>
            {item.name}
          </h6>
        </div>
        <div className="p-1" style={style.list}>
          <h6>${parseFloat(item.price).toFixed(2)}</h6>{' '}
        </div>
        <div className="p-1" style={style.list}>
          <h6>x{item.purchaseQuantity}</h6>
        </div>
        </div>
        <span className="text-muted d-none">$12</span>
        <button
          className="bg-danger p-3 text-white"
          role="img"
          aria-label="trash"
          onClick={() => removeFromCart(item)}
        >
          X
        </button>
      </li>
    </div>
  );
};

export default CartItem;
