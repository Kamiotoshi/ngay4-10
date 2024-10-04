import LoginBox from "../LoginRegister/LoginBox";
import LoginBanner from "../LoginRegister/LoginBanner";
import { useEffect } from "react";

export default function Login() {
	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
	return (
		<div>
			<LoginBanner/>
			<LoginBox/>
		</div>
	)
}
