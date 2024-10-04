import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckOutArea() {
    const [cart, setCart] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        // country: 'default',
        address1: '',
        address2: '',
        city: '',
        // district: '',
        orderNotes: '',
        // shipToDifferentAddress: false
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();  // Hook for navigation
    const [quantity, setQuantity] = useState({});
    const [userId, setUserId] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    // Retrieve userId from localStorage (stored during login) and fetch cart items
  useEffect(() => {
    const storedUserId = localStorage.getItem('Token');
    if (storedUserId) {
      setUserId(storedUserId);
      
      // Fetch cart items from the backend
      const fetchCartItems = async () => {
        const url = `https://projectky320240926105522.azurewebsites.net/api/Cart/user/${storedUserId}`;
        try {
          const rs = await axios.get(url, { withCredentials: true }); // Ensure cookies are sent
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
      // If userId isn't available, redirect to login
      navigate('/login');
    }
  }, [navigate]);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setBillingDetails(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        let firstErrorField = null;
    
        if (!billingDetails.firstName) {
            newErrors.firstName = "First name is required";
            firstErrorField = firstErrorField || 'firstName';
        }
        if (!billingDetails.lastName) {
            newErrors.lastName = "Last name is required";
            firstErrorField = firstErrorField || 'lastName';
        }
        if (!billingDetails.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
            firstErrorField = firstErrorField || 'phoneNumber';
        }
        if (!billingDetails.email) {
            newErrors.email = "Email address is required";
            firstErrorField = firstErrorField || 'email';
        }
        if (!billingDetails.address1) {
            newErrors.address1 = "Address line 1 is required";
            firstErrorField = firstErrorField || 'address1';
        }
        if (!billingDetails.city) {
            newErrors.city = "Town/City is required";
            firstErrorField = firstErrorField || 'city';
        }
        // if (!billingDetails.district) {
        //     newErrors.district = "District is required";
        //     firstErrorField = firstErrorField || 'district';
        // }
    
        setErrors(newErrors);
    
        if (firstErrorField) {
            const errorField = document.getElementById(firstErrorField);
            if (errorField) {
                const rect = errorField.getBoundingClientRect();
                const offset = window.innerHeight / 2 - rect.height / 2;
        
                window.scrollTo({
                    top: window.scrollY + rect.top - offset,
                    behavior: 'smooth'
                });
            }
        }
    
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!validate()) return;
        const userId = localStorage.getItem('Token');
        const checkoutData = {
            userId,  // Hardcoded for now, replace with dynamic value (e.g., from auth context)
            shippingMethod:'COD' ,   //selectedOption
            paymentMethod: 'COD',  // Hardcoded, replace with dynamic if needed
            shippingAddress: billingDetails.address1,
            billingAddress: billingDetails.address2,  // Assuming billing and shipping are the same for now
            city: billingDetails.city,
            orderNote: billingDetails.orderNotes,
            telephone: billingDetails.phoneNumber,
            email: billingDetails.email,
            name: `${billingDetails.firstName} ${billingDetails.lastName}`,
            paid: false,  // Assuming unpaid for now
            
        };

        try {
            const response = await axios.post('https://projectky320240926105522.azurewebsites.net/api/Order/checkout', checkoutData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                alert('Order placed successfully!');
                navigate('/confirmation/' + data.orderId);
            } else {
                alert(`Checkout failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred during checkout.');
        }
    };

    

    
    return (
        <section className="checkout_area section_gap">
            <div className="container">
                
                <div className="billing_details">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Billing Details</h3>
                            <form className="row contact_form" onSubmit={handleCheckout} noValidate>
                                {['firstName', 'lastName', 'phoneNumber', 'email', 'address1', 'address2', 'city'].map((field, index) => (
                                    <div key={index} className={`col-md-${field === 'address1' || field === 'address2' || field === 'city'  ? 12 : 6} form-group p_star ${billingDetails[field] ? 'input-has-value' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={field}
                                            name={field}
                                            value={billingDetails[field]}
                                            onChange={handleInputChange}
                                        />
                                        <span className="placeholder" data-placeholder={`${field === 'address1' ? 'Address line 01' : field === 'address2' ? 'Address line 02' : field.charAt(0).toUpperCase() + field.slice(1).replace('Name', ' name')}`}></span>
                                        {errors[field] && <div className="error">{errors[field]}</div>}
                                    </div>
                                ))}
                                
                                <div className="col-md-12 form-group">
                                    {/* <div className="creat_account">
                                        <h3>Shipping Details</h3>
                                        <input
                                            type="checkbox"
                                            id="f-option3"
                                            name="shipToDifferentAddress"
                                            checked={billingDetails.shipToDifferentAddress}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="f-option3">Ship to a different address?</label>
                                    </div> */}
                                    <textarea
                                        className="form-control"
                                        name="orderNotes"
                                        id="message"
                                        rows="1"
                                        placeholder="Order Notes"
                                        value={billingDetails.orderNotes}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="col-md-12 form-group">
                                    <button className="primary-btn" type="submit">Proceed to Checkout</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="order_box">
                                <h2>Your Order</h2>
                                <ul className="list">
                                    <li><a style={{fontWeight: "bold"}}>Product <span>Total</span></a></li>
                                    {cart.map((item, index) => (
                                        <li key={index}>
                                            <a>
                                                <div className="product-details" style={{display: "flex", flexDirection: "column"}}>
                                                    <div className="product-name" style={{fontWeight: "bold", overflowWrap: "break-word"}}>{item.variant.product.name}  </div>
                                                    <div className="product-color" style={{fontSize: "0.9em", color: "#777"}}>Color: {getColorName(item.variant.colorId)} <span className="middle">× {item.quantity}</span> <span className="last">{item.price * item.quantity} $</span></div>
                                                    <div className="product-size" style={{fontSize: "0.9em", color: "#777"}}>Size: {getSizeName(item.variant.sizeId)}</div>
                                                </div>
                                                
                                                
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="list list_2">
                                     <li><a href="#">Shipping <span>COD</span></a></li>  {/*{selectedOption} */}
                                    <li><a href="#">Total <span>${(subTotal).toFixed(2)}</span></a></li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
