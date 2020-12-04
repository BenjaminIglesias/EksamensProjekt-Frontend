import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import StarWars from "./starWars";
import WelcomePage from "./welcomePage";
import { Switch, Route, NavLink } from "react-router-dom";
import FoodItems from "./foodItems";
import shoppingcart from "./logos/shopping-cart.PNG";




function Header({ loggedIn }) {
  return (
    <div>
      <div className="App-fake-header" />
      <ul className="App-header header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
            Login
          </NavLink>
        </li>        
        {loggedIn && (
        <li className="Shoppingcart" style={{float:'right'}}>
          <NavLink activeClassName="selected" to="/Shoppingcart">
            <img
              src={shoppingcart}
              alt=""
              type="image/"
              width="35"
              height="22"
            />
          </NavLink>
        </li>
	   )}
     	
      </ul>
    </div>
  );
}
function Products() {
 

  return <FoodItems postalCode={globalPostalCode} />;
 
}

let globalPostalCode = "fail";

function Home() {
  
  const [postalCode, setPostalCode] = useState("");


function handleChange(newValue){
  setPostalCode(newValue);
  globalPostalCode = newValue;
} 

  return <WelcomePage  postalCode={postalCode} onChange={handleChange}/>;
}

function LoginPage({ setLoggedIn, loggedIn }) {
  const [loggedInError, setLoggedInError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => err.fullError)
      .then((data) => setLoggedInError(data));
  };

  if (loggedInError) {
    return (
      <div>
        <LogIn login={login} />
        <h3>{loggedInError.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("");
  const jwt = require("jsonwebtoken");
  const token = localStorage.getItem("jwtToken");
  const role = jwt.decode(token).roles;

  let roleToFetch = role;
  if (roleToFetch === "admin,user") {
    roleToFetch = "admin";
  }
  useEffect(() => {
    facade.fetchData(roleToFetch).then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );
}

function App() {
const [loggedIn, setLoggedIn] = useState(false);
globalPostalCode = "fail"




  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home    />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route>
        <Route exact path="/Products">
          <Products/>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
