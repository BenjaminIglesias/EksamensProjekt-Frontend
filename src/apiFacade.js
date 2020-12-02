import URL from "./settings";

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

  const fetchDataFoodWasteByPostnummer = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/foodwaste/postnummer" , options).then(handleHttpErrors);
  };

  const fetchDataFoodWasteBySearchZip = (zip) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/foodwaste/zip"+zip , options).then(handleHttpErrors);
  };

  const fetchDataWeatherByCity = (city) => {
    const options = makeOptions("GET"); //True add's the token
    return fetch(URL + "/api/vejret/by/"+city , options).then(handleHttpErrors);
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
    fetchDataWeatherByCity,
    fetchDataFoodWasteByPostnummer
    
  };
}
const facade = apiFacade();
export default facade;
