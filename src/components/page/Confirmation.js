import { useEffect } from "react";
import ConfirmationBanner from "../Confirmation/ConfirmationBanner";
import OrderDetailArea from "../Confirmation/OrderDetailArea";

export default function OrderDetail() {
	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
	return (
		<div>
			<ConfirmationBanner/>
			<OrderDetailArea/>
		</div>
	)
}
