import './App.css';

import { Routes, Route } from "react-router-dom";
import Join from './component/Join/Join.js';
import Chat from './component/Chat/Chat.js';
import { Toaster } from 'react-hot-toast';

function App() {
  return (

    <div className="App" >

<Toaster
  position="top-right"
  // reverseOrder={false}
/>

      <Routes>
        <Route  exact path="/"  element={<Join/>}/>
          <Route  path="/chat/:roomName" element={<Chat/>} />     
      </Routes>


    </div>

  );
}

export default App;
