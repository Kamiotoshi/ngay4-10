import { useEffect } from "react";
import CheckOutArea from "../CheckOut/CheckOutArea";
import CheckOutbanner from "../CheckOut/CheckOutbanner";

export default function Checkout() {
    useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
    return (
        <div>
            <CheckOutbanner/>
            <CheckOutArea/>
        </div>
    )
}
