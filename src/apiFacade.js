import URL from "./settings";
import postnummer from "./postnummer"
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = (role) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + role, options).then(handleHttpErrors);
  };

  const fetchDataFoodWasteByPostnummer = (value) => {  
    const options = makeOptions("GET", true); //True add's the token
    let city = "/"+postnummer[value]
      city = getAndSetCurrentCity(city)
    return fetch(URL + "/api/foodwaste/data/"+value+city , options).then(handleHttpErrors);
  };


  
  const fetchDataFoodWasteBySearchZip = (zip) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/foodwaste/zip"+zip , options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchDataFoodWasteByPostnummer
    
  };
}
const facade = apiFacade();
export default facade;




const getAndSetCurrentCity = (city) => {

   if (city.indexOf(" ") > 0) {
     let i = city.indexOf(" ");
     let cityCut = city.substr(0, i);
     return cityCut
     } else {
      return city;
    }
   }
 


