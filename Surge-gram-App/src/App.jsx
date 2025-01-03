import React from 'react'; // eslint-disable-line no-unused-vars
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        
               <Route path="/" element={<Home/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;