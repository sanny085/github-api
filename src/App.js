import React, { useState } from 'react'; 
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router,  Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Router>
         <Switch>
           <Route path="/signin" component={Signin} />
           <Route path="/signup" component={Signup} />
           <Route exact path="/" component={Home} />
           <Route component={PageNotFound} /> 
         </Switch>
      </Router>
    </div>
  );
}

export default App;
