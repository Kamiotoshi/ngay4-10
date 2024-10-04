import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Retrieve userId and fetch cart, colors, and sizes
  useEffect(() => {
    const storedUserId = localStorage.getItem('Token');
    if (storedUserId) {
      setUserId(storedUserId);

      // Fetch cart items
      const fetchCartItems = async () => {
        const url = `https://projectky320240926105522.azurewebsites.net/api/Cart/user/${storedUserId}`;
        try {
          const rs = await axios.get(url, { withCredentials: true });
          const data = rs.data;
          setCart(data);
          // Initialize quantity state from backend cart data
          const initialQuantities = data.reduce((acc, item) => {
            acc[item.variantId] = item.quantity;
            return acc;
          }, {});
          setQuantity(initialQuantities);
        } catch (error) {
          console.log(error);
        }
      };

      // Fetch colors
      const fetchColors = async () => {
        try {
          const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Color');
          setColors(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      // Fetch sizes
      const fetchSizes = async () => {
        try {
          const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Size');
          setSizes(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchCartItems();
      fetchColors();
      fetchSizes();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const updateQuantity = async (variantId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.variantId === variantId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    setQuantity((prev) => ({ ...prev, [variantId]: newQuantity }));

    // Update the new quantity to the backend using PUT
    const cartItem = cart.find(item => item.variantId === variantId);
    if (!cartItem) return;

    try {
      await axios.put(`https://projectky320240926105522.azurewebsites.net/api/Cart/update/${cartItem.cartItemId}`, {
        quantity: newQuantity, // Send updated quantity
      });
    } catch (error) {
      console.error('Failed to update the quantity', error);
    }
  };

  const deleteCartItem = async (cartItemId) => {
    try {
      await axios.delete(`https://projectky320240926105522.azurewebsites.net/api/Cart/remove/${cartItemId}`);
      // Remove the item from the cart state
      setCart(cart.filter(item => item.cartItemId !== cartItemId));
    } catch (error) {
      console.error('Failed to delete the cart item', error);
    }
  };

  const increaseQuantity = (variantId) => {
    const newQuantity = (quantity[variantId] || 1) + 1;
    updateQuantity(variantId, newQuantity);
  };

  const decreaseQuantity = (variantId) => {
    const newQuantity = (quantity[variantId] || 1) - 1;
    if (newQuantity >= 1) {
      updateQuantity(variantId, newQuantity);
    }
  };

  const getColorName = (colorId) => {
    const color = colors.find((color) => color.colorId === colorId);
    return color ? color.colorName : 'Unknown';
  };

  const getSizeName = (sizeId) => {
    const size = sizes.find((size) => size.sizeId === sizeId);
    return size ? size.sizeName : 'Unknown';
  };

  const subTotal = cart.reduce((total, item) => {
    return total + item.price * (quantity[item.variantId] || item.quantity);
  }, 0);

  const handleCheckoutNavigation = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <section className="cart_area">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  {(cart.length > 0) ? (
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Action</th> {/* Add Action column for delete button */}
                    </tr>
                  ) : (
                    <></>
                  )}
                </thead>
                <tbody>
                  {(cart.length > 0) ? (
                    cart.map((item) => (
                      <tr key={item.variantId}>
                        <td>
                          <div className="media">
                            <div className="d-flex">
                              <img
                                src={item.image}
                                alt={item.variant.product.name}
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                              />
                            </div>
                            <Link className="media-body" to={`/product-detail/${item.variant.productId}`} style={{ color: "black" }}>
                              <p>{item.variant.product.name}</p>
                              <div>
                                <div>Color: {getColorName(item.variant.colorId)}</div>
                                <div>Size: {getSizeName(item.variant.sizeId)}</div>
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td>
                          <h5>${item.price.toFixed(2)}</h5>
                        </td>
                        <td>
                          <div className="product_count">
                            <input
                              type="number"
                              name="qty"
                              value={quantity[item.variantId] || item.quantity}
                              onChange={(e) => updateQuantity(item.variantId, Number(e.target.value))}
                              className="input-text qty"
                              min="1"
                            />
                            <button
                              onClick={() => increaseQuantity(item.variantId)}
                              className="increase items-count"
                              type="button"
                            >
                              <i className="lnr lnr-chevron-up" />
                            </button>
                            <button
                              onClick={() => decreaseQuantity(item.variantId)}
                              className="reduced items-count"
                              type="button"
                            >
                              <i className="lnr lnr-chevron-down" />
                            </button>
                          </div>
                        </td>
                        <td>
                          <h5>${(item.price * (quantity[item.variantId] || item.quantity)).toFixed(2)}</h5>
                        </td>
                        <td>
                          {/* Delete button */}
                          <button
                            onClick={() => deleteCartItem(item.cartItemId)}
                            className="btn btn-danger"
                          >
                            <i class="bi bi-x-octagon"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <Link
                      style={{
                        fontSize: "40px",
                        textDecoration: "none",
                        color: "black",
                        border: "solid 2px black",
                        padding: "5px",
                        marginTop: "20px",
                        borderRadius: "5px",
                        backgroundColor: "orange"
                      }}
                      to="/category"
                    >
                      Back to Shopping
                    </Link>
                  )}
                  {(cart.length > 0) && (
                    <>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>${subTotal.toFixed(2)}</h5>
                        </td>
                      </tr>
                      <tr className="out_button_area">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="checkout_btn_inner d-flex align-items-center">
                            <Link className="gray_btn" to="/category">
                              Continue Shopping
                            </Link>
                            <a onClick={handleCheckoutNavigation} className="primary-btn" href="#">
                              Proceed to checkout
                            </a>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
