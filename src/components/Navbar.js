import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";

import useApi from "../hooks/useApi";
import { loadUser } from "../store/reducers/user";

function Navbar() {
  const { loading, error, data: categories } = useApi(
    "https://fakestoreapi.com/products/categories",
    null
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const cartItems = useMemo(() => {
    console.log({ cart });
    /**
     * {
     *   '9': {
     *    ...,
     *    qunatity: 3
     *   }
     * }
     */
    let totalItems = 0;

    if (Object.keys(cart).length > 0) {
      Object.keys(cart).forEach((productId) => {
        totalItems += cart[productId].quantity;
      });
    }

    return totalItems;
  }, [cart]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && categories?.length > 0) {
      history.push(`/products/${categories[0]}`);
    }
  }, [categories, loading, history]);

  if (loading) {
    return <div className="loader">Categories is loading...</div>;
  } else if (error) {
    return <div className="error">Oops please reload the page!!</div>;
  } else if (categories.length === 0) {
    return <div>No categories found.</div>;
  } else {
    return (
      <div className="navbar">
        <div className="products">
          {categories.map((category) => (
            <NavLink
              key={`category-${category}`}
              className="product-category"
              activeClassName="product-category--selected"
              to={`/products/${category}`}
            >
              {category}
            </NavLink>
          ))}
        </div>
        <Link to="/cart" className="cart-icon-container">
          <FaOpencart className="cart-icon" />
          <div className="cart-items">{cartItems}</div>
        </Link>
      </div>
    );
  }
}

export default Navbar;
