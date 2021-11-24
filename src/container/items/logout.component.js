import React from "react";
import AuthService from "../../services/item/auth.service";
import { useHistory } from "react-router-dom";

const LogOut =()=>{
    let history = useHistory();

    const logout = ()=>{
        AuthService.logout();
        history.push("/login");
        window.location.reload();
    }
    return(
        <div onClick={logout}>
            <p>LogOut</p>
        </div>
    )
}
export default LogOut;