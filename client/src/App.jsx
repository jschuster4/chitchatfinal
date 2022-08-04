import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import ShowAll from './components/ShowAll';
// import io from 'socket.io-client'
import { useState } from 'react';
import JoinChat from './components/JoinChat';

// const socket = io.connect("http:localhost:8000");

function App() {
  // const [socket] = useState(() => io(':8000'))
  return (
    <div className="App">
      
      
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/users" element={<ShowAll/>}></Route>
        <Route path="/chatrooms" element={<JoinChat/>}></Route>
      </Routes>




    </div>
  );
}

export default App;
