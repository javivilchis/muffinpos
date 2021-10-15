import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/esm/Card';
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };
  const width = 100 / categories.length;
  const style = {
    tabs: {
      background: '#f4f4f4',
      fontSize: '2rem',
      color: '#ffc107',
      width: `${width}%`,
    },
    sticky: {
      top: '3.7em',
      position: 'fixed',
      right: 0,
      width: '75%',
      zIndex: 33,
      display: 'flex',
      justifyContent: 'space-around',
    },
  };
  console.log(categories);
  return (
    <div className="row">
      <div className="col-12" style={{ position: 'relative', width: '100%' }}>
        <Nav variant="tabs" defaultActiveKey="/home" style={style.sticky}>
          {categories.map((item) => {
            return (
              <Nav.Item style={style.tabs} key={item._id}>
                <Nav.Link
                  style={style.tabs}
                  onClick={() => {
                    handleClick(item._id);
                  }}
                >
                  {' '}
                  {item.name}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default CategoryMenu;
