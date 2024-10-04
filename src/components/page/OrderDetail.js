import { useEffect } from "react";
import ConfirmationBanner from "../Confirmation/ConfirmationBanner";
import UserOrderDetail from "../User/UserOrderDetail";

export default function Confirmation() {
	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
	return (
		<div>
			<ConfirmationBanner/>
			<UserOrderDetail/>
		</div>
	)
}
