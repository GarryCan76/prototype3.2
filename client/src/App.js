import './App.css';
import io from 'socket.io-client'
import LoginRegister from "./LoginRegister";
import {useState} from "react";

const socket = io.connect('http://localhost:3001')

function App() {
    const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="App">
        {loggedIn && <p>You are logged in</p>}
        {!loggedIn && <LoginRegister socket={socket}/>}
    </div>
  );
}

export default App;
