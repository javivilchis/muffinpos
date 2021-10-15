/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  const { options } = currentProduct;
  const renderOptions = () => {
    if (options) {
      return options.map((option) => {
        return (
          <button
            className="btn btn-primary my-2"
            id={option.name}
            key={option.name}
          >
            Add {option.name}
          </button>
        );
      });
    }
  };

  if (Auth.loggedIn()) {
    return (
      <>
        {currentProduct && cart ? (
          <Container>
            <Row>
              <Col className="p-5">
                <Link className="btn btn-primary" to="/">
                  ← Back to Products
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <img
                  className="rounded shadow"
                  src={`/images/${currentProduct.image}`}
                  alt={currentProduct.name}
                />
              </Col>
              <Col>
                <h2>{currentProduct.name}</h2>

                <p>{currentProduct.description}</p>
                <p>
                  <strong>Price:</strong>$
                  {parseFloat(currentProduct.price).toFixed(2)}{' '}
                </p>
                <p>
                  <button className="btn btn-success" onClick={addToCart}>
                    Add to Cart
                  </button>{' '}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                  >
                    Remove from Cart
                  </button>
                </p>
                <p className="row">{renderOptions()}</p>
              </Col>
            </Row>
          </Container>
        ) : null}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default Detail;
