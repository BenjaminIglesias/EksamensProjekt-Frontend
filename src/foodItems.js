import facade from "./apiFacade";
import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SideFilter from "./sideFilter.js"
import MapContainer from "./mapItem.js"
import MapContainerAll from "./mapAllItems.js"
import NettoLogo from "./logos/netto.png";
import FoetexLogo from "./logos/foetex.png"
import imageNotFound from "./imageNotFound.png"
import WeatherItem from "./weatherItem"


export default function FoodItems({postalCode}){  
    const [fetchedData, setfetchedData] = useState([]);
    const [initalData, setInitalData] = useState([]);
    const [sortedData, setSortedData] = useState();
    const [location, setLocation] = useState({longitude : 0.0, latitude :0.0});
    const [weather, setWeather] = useState({});
    const [err, setErr] = useState("");

useEffect(()=>{
    facade.fetchDataFoodWasteByPostnummer(postalCode).then(data => {
      setfetchedData(data.foodwaste);  
      setInitalData(data.foodwaste)
      setWeather(data.vejret)
    }).catch((error) => {
     setErr("Could not load data from server. Try another zip code")
    })

    /* Propmts user to allow geolocation*/ 
    if (window.navigator.geolocation) {
      window.navigator.geolocation
       .getCurrentPosition(getLocations);
        } 
     
        function getLocations(position){
             const {coords} = position;
             setLocation(coords)
        }

},[])


return (<div> 

<div className="infoTitle"> 
<br></br>
 <h1>Tilbud under postnummert 2800 </h1>
 <WeatherItem weather={weather}/>
</div>

<SideFilter setSortedData={setSortedData}
                            data={initalData} 
                            latitude={location.latitude} 
                            longitude={location.longitude} />

<MapContainerAll data={fetchedData} initLoc={[{lat:54, lng:12.4}]} />
 
  {err && <h3 style={{display:"block",textAlign:"center"}}>{err}</h3>}
<FoodItem fetchedData={sortedData ? sortedData : fetchedData} location={location}/> </div>);

}




function FoodItem({fetchedData, location}) {
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
       <MapContainer loc={data.store.coordinates} name={data.store.name}/>
    </div>
      
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
  

