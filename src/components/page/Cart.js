import React, { useEffect } from 'react';
import Banner from '../ShopCart/Banner';
import Cart  from '../ShopCart/Cart';
function ShopCart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Banner />
        <Cart />
    </div>
  );
}

export default ShopCart;
