import {useState} from "react";
import Login from "./Login";
import Register from "./Register";

function LoginRegister(props){
    const socket = props.socket;
    const [login, setLogin] = useState(true);


    function loginWindowSwitch(){
        setLogin(!login)
    }

    return(
        <div>
            {login && <Login socket={socket} loginWindowSwitch={loginWindowSwitch}/>}
            {!login && <Register socket={socket} loginWindowSwitch={loginWindowSwitch}/>}
        </div>

    )
}

export default LoginRegister;