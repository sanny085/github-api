import React, { useState, useReducer, useEffect} from 'react'; 
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router,  Switch, Route, Link } from 'react-router-dom';
// firebase
import firebase from 'firebase/app';
import "firebase/auth";

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup'; 
import PageNotFound from './pages/PageNotFound';

import UserContext from './context/UserContext';
import Header from './layout/Header';
import Footer from './layout/Footer';

import firebaseConfig from './Config/firebaseConfig';

// firebase for storing database and storage
import { imageConfig } from './utils/config';
import "firebase/database";
import "firebase/storage";

// reducer and context
import reducer from './context/reducer';

import { SET_CONTACT, SET_LOADING } from './context/action.types';
 

// init (Initialize) Firebase
firebase.initializeApp(firebaseConfig);

const initialState = {
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false 
};

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const [user, setUser] = useState(null);
  const [userApi, setUserApi] = useState(null);
 
  // will get contacts from firebase and set it on state contacts array
  const getContacts = async () => {
    // TODO: load existing data
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

   const contactsRef = await firebase.database().ref('/contacts');
   contactsRef.on( "value", snapshot => {
      dispatch({
        type: SET_CONTACT,
        payload: snapshot.val()
      });
      dispatch({
        type: SET_LOADING,
        payload: false
      });
    } 
   );

  };

  // getting contact  when component did mount
  useEffect(() => {
    getContacts() 
  }, []);

  return (
  <div className="App">
     <Router>
         
          <UserContext.Provider value={{user ,userApi, state, dispatch, setUser, setUserApi}}>
          <ToastContainer/>
           <Header/>
           {  console.log("Nikhil state "+state.check)}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
            
              <Route exact path="*" component={PageNotFound} /> 
            </Switch>
            <Footer/>
          </UserContext.Provider> 
         
      </Router>
  </div>
  );
}

export default App;

