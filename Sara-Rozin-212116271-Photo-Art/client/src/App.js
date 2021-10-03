
import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Pictures from './components/Pictures';
import ShoppingCart from './components/ShoppingCart';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);
  const [token, setToken] = useState(null);
  const data = { userId: localStorage.getItem("userId"), isCart: false, pictures: null, updateCart: () => setReload(!reload) };
  return (
    <>
      <div className="App">
        <Header />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={Home} path="/home" />
          <Route component={() => <Login reload={reload} updateCart={() => { setReload(!reload) }} setReload={() => { setReload(!reload) }} />} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={(props) => <Pictures {...props} data={data} />} path="/pictures" />
          <Route component={(props) => <ShoppingCart {...props} reload={reload} userId={localStorage.getItem("userId")} updateCart={() => { setReload(!reload) }} />} path="/shopping-cart" />
        </Switch>
      </div>
    </>
  );
}

export default App;
