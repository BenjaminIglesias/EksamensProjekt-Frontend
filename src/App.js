import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import StarWars from "./starWars";
import WelcomePage from "./welcomePage";
import { Switch, Route, NavLink } from "react-router-dom";
import FoodItems from "./foodItems";
import shoppingcart from "./logos/shopping-cart.PNG";
import postnummer from "./postnummer";
import NettoLogo from "./logos/netto.png";
import FoetexLogo from "./logos/foetex.png"
import imageNotFound from "./imageNotFound.png"
import Popup from 'reactjs-popup';


function Header({ loggedIn }) {
  return (
    <div>
      <div className="App-fake-header" />
      <ul className="App-header header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Hjem
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
            Login
          </NavLink>
        </li>  
        <li>
          <NavLink activeClassName="selected" to="/CreateUser">
            Ny bruger
          </NavLink>
        </li>      
        {loggedIn && (
          <>
          <li>
        <NavLink activeClassName="selected" to="/Favorits">
          Favorits
         </NavLink>
     </li>
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
       
    </>
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

function LoginPage({ setLoggedIn, loggedIn, setFavorits }) {
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
          <LoggedIn setFavorits={setFavorits}  />
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


function LoggedIn({setFavorits}) {
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
    getFavorits(setFavorits)
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );

}


function CreateUser(){
  
  const init = { username: "", password: "" };
  const [UserCredentials, setUserCredentials] = useState(init);
  const [errFromServer, setErrFromServer] = useState({message:""});
  const performCreate = (evt) => {
    evt.preventDefault();
    console.log(UserCredentials.username, UserCredentials.password)
    facade.createUser(UserCredentials.username, UserCredentials.password).catch(err =>  err.fullError).then((data) => setErrFromServer(data));

};


  const onChange = (evt) => {
    setUserCredentials({
      ...UserCredentials,
      [evt.target.id]: evt.target.value,
    });
  };




  return (
    <div>
    
    
      <h2>Opret ny bruger</h2>
      {errFromServer.message}
      <form onChange={onChange}>
        <input placeholder="Brugernavn" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performCreate}>Opret ny Bruger</button>
      </form>
    </div> 
   


  )
}


function Favorits({favorits}){

const [stores, setStores] = useState([])
const [favorit, setFavorit] = useState(favorits)
const {postnumre} = favorits
const [storeNames, setStoreNames] = useState(favorits.storeNames)
const [zip, setZip] = useState(postnumre[0])
useEffect(() => {
 
let d =[]

getFavorits(setFavorit)
setStoreNames(favorit.storeNames)

    facade.fetchDataFoodWasteBySearchZip(zip)
            .then(data => {
        
              setStores(data)
              
              data.map((dat) => {
                  storeNames.map((store) => {
                    if (store.includes(dat.store.name)) {
                      d.push(dat)
                    }  
                  })
                
              })
              setStores(d)
            })
   
}, [zip, storeNames])


let zips = favorit ? favorit.postnumre : postnumre
let sNames = favorit ? favorit.storeNames : favorits.storeNames
  return ( <div> 
  
<div className="infoTitle"> 
<br></br>

  <h1>Tilbud i dine favorit butikker {zip}</h1>
  <br></br>
  <div className="zipButDiv">
  {zips.map((nr) => {
      return <button key={nr} className="zipBut" onClick={() => {
        setZip(nr) 
      } }>{nr}</button>
    })}
  </div>
  

</div>



 <FoodItem fetchedData={stores} fav={sNames} setStoreNames={setStoreNames}/>
  
 </div>);

}




function FoodItem({fetchedData, fav, setStoreNames}) {


    let brandPhoto;

    let returned = fetchedData.map((data, index) => {

        if(data.clearances.length === 0){
            return null;
        } else {
        
        if(data.store.brand === "netto"){
            brandPhoto = NettoLogo
        }    

        if(data.store.brand === "foetex"){
            brandPhoto = FoetexLogo
}  


  

      return (
   
   <div className="stores" key={index}>
    <img src={brandPhoto} alt="" style={{width:"30%"}}></img> 
    <div style={{display:"flex"}}>
       <h3 style={{display:"inline-block"}}> {data.store.name} </h3>
     
     
    </div>
      {fav.map((d, index) => {

        let res =[...fav]
        if (d[0] == data.store.name){
          return <button onClick={() => {
            facade.removeDataFarvorit(d[1])
            
          res[index] = ["NaN", "NaN"]

           setStoreNames(res)

          }}>remove from favorits</button>
        }
      })}
      <p style={{marginTop:"0px"}}>{data.store.address.street}, {data.store.address.zip} {data.store.address.city}</p>
     

        {data.clearances.map((data) => {

     return( 
   
    <div style={{display: "inline-block"}} key={data.product.description} >
    
      <Popup modal trigger={
    
    <div className="card" onClick={()=> {console.log(data.product.description)}}>
    <img className="photo" src={data.product.image ? data.product.image : imageNotFound} alt="" ></img> 
     <div className="container">
     <h1 className="description">{data.product.description}</h1>    
     <p className="price" style={{fontWeight: "bold", color:"black"}}> {data.offer.newPrice} kr.</p>
    </div>
    </div>

      }>
    
     <h1 className="description">{data.product.description}</h1>    
       <p className="price" style={{fontWeight: "bold", color:"black"}}> Nuværende Pris: {data.offer.newPrice} kr.</p>
       <p className="price">Original Pris: {data.offer.originalPrice} kr.</p>
       <p className="price">Prisforskel: {data.offer.discount} kr.</p>
       <p className="price">Besparelse: {data.offer.percentDiscount} %</p>
       <p>Varen udløber:</p>
       <p>d. {data.offer.endTime.replace(/T/g, " ").substring(0,19)}</p>
       <p>Der er {data.offer.stock} tilbage</p>
 
  
          </Popup>
        </div>
                     ) /* Mappings Return ends here */

                  })  /* Mapping ends here */
                } 
      </div>
         );
      } 
    });

    return returned;
  }
 











function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [favorits, setFavorits] = useState({});


globalPostalCode = "fail"

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} setFavorits={setFavorits} />
        </Route>
        <Route exact path="/CreateUser">
          <CreateUser/>     
        </Route>
        <Route exact path="/Products">
          <Products/>
        </Route>
        <Route exact path="/Favorits">
          <Favorits favorits={favorits}/>
        </Route>
      </Switch>
    </div>
  );
}


function getFavorits(setFavorits){
  let postnumre = []
  let storeNames = []
  let favID = []
 facade.fetchDataFavorits().then(data => {

  data.map((obj) => {
    if (!storeNames.includes(obj.storeName)){
    storeNames.push([obj.storeName, obj.favID])
    favID.push(obj.favID)
    }
  })

  data.map((obj) => {
      if (!postnumre.includes(obj.postnummer)){
       postnumre.push(obj.postnummer)
       }     
    })
 
  setFavorits({
    postnumre: postnumre,
    storeNames: storeNames
  })
  })


}
export default App;
