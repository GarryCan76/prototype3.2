import {useState} from "react";

function Login(props){
    const socket = props.socket;
    const [loginScreen, setloginScreen] = useState(true);

    function loginAttempt(){
        socket.emit('loginAttempt', 'hihi')
    }

    return(
        <div>
            <input type={"text"}/>
            <input type={"password"}/>
            <input type={"submit"} onClick={loginAttempt} name={"login"}/>
            <button onClick={()=>{props.loginWindowSwitch()}}>Register</button>
        </div>

    )
}

export default Login;