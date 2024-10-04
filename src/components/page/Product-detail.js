import React, { useEffect } from 'react'
import Detailbanner from '../../components/Details/Detailbanner';
import Productimg from '../../components/Details/Productimg';
import Description from '../../components/Details/Description';
import Related from '../../components/Details/Related';
import Footer from '../../components/Details/Footer';
const ShopDetail = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
    return (
        <div>
            <Detailbanner />
            <Productimg />
            <Description />
            <Related />
            <Footer />
        </div>
      );
}

export default ShopDetail