import { useEffect } from "react";
import SettingBanner from "../User/SettingBanner";
import UserProfile from "../User/UserProfile";


export default function User(){
    useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
    return(
        <div>
            <SettingBanner />
            <UserProfile />
        </div>
    )
}