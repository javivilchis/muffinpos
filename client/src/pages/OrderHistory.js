import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import MainNav from '../components/MainNav';
import Cheugy from '../components/Cheugy';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  const styles = {
    buttonStyle: {
      marginTop: '5rem',
    },
  };
  if (Auth.loggedIn()) {
    return (
      <div className="row d-flex p-0 m-0">
        <div className="col-12 col-md-3 p-0 bg-light vh-100">
          <Cheugy />
        </div>
        <div className="col-12 col-md-9 p-0 ">
          <MainNav />
          <div class="p-2">
            <Link
              style={styles.buttonStyle}
              className="pl-5 btn btn-warning ml-4 text-center"
              to="/"
            >
              ← Back to Products
            </Link>
          </div>
          {user ? (
            <>
              <div class="p-2">
                <h2>
                  Order History for {user.firstName} {user.lastName}
                </h2>
              </div>
              {user.orders.map((order) => (
                <div key={order._id} className="my-2">
                  <h3>
                    {new Date(
                      parseInt(order.purchaseDate)
                    ).toLocaleDateString()}
                  </h3>
                  <div className="flex-row">
                    {order.products.map(
                      ({ _id, image, name, price }, index) => (
                        <div key={index} className="card px-1 py-1 shadow ">
                          <img alt={name} src={`/images/${image}`} />
                          <p>{name}</p>
                          <div>
                            <span>${parseFloat(price).toFixed(2)}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default OrderHistory;
