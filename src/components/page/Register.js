import { useEffect } from "react";
import RegisterBanner from "../LoginRegister/RegisterBanner";
import RegisterBox from "../LoginRegister/RegisterBox";

export default function Register(){
    useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
    return(
        <div>
            <RegisterBanner/>
            <RegisterBox/>
        </div>
    )
}