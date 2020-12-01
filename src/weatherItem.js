import { useEffect, useState } from "react"
import facade from "./apiFacade"
import skyet from "./icons/skyet.png"
import mestSkyet from "./icons/mestSkyet.png"
import regn from "./icons/regn.png"
import sne from "./icons/Sne.png"
import sol from "./icons/Solrigt.png"
export default function WheaterItem({city}){

const [weather, setWeather] = useState({})


useEffect(()=> {
    facade.fetchDataWeatherByCity(city ? city : "København" )
    .then((data) => {
        setWeather(data)
    })
}, [])


 let weatherImage; 
    switch (weather.skyText) {
        case "Solrigt":
            weatherImage = sol
        break;

        case "Klart":
            weatherImage = sol
            break;
        
        case "Skyet":
        weatherImage = skyet
         break;
        
        case "Mest skyet", "Delvis solrig":
            weatherImage = mestSkyet
        break;  
        case "Regn", "Let regn", "Regnbyger":
            weatherImage = mestSkyet
        break;        
        
        default:
            weatherImage = skyet
    }


return(
    <div className="weatherBox">
                <h5>Current weather</h5>
        <img src={weatherImage}/>
        <h3>{weather.temperature}°</h3>
    </div>
)

}