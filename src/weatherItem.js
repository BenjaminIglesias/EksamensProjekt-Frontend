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

 
    facade.fetchDataWeatherByCity(city)
    .then((data) => {
        setWeather(data)
    
    })
    
  
}, [city])




 let weatherImage = setImage(weather.skyText)
    


return(
    <div className="weatherBox">
                <h5>Current weather</h5>
        <img src={weatherImage}/>
        <h3>{weather.temperature}°</h3>
    </div>
)

}


function setImage(weather) {
    switch (weather) {
        case "Solrigt", "Klart":
           return sol;

        case "Skyet":
        return skyet;
        
        
        case "Mest skyet", "Delvis solrig":
            return mestSkyet;
       
        case "Regn", "Let regn", "Regnbyger":
            return regn;
            
        
        default:
            return skyet;
    }
}