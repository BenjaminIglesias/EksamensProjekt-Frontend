import facade from "./apiFacade";
import React, { useState, useEffect } from "react";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NettoLogo from "./logos/netto.png";
import FoetexLogo from "./logos/foetex.png"
import imageNotFound from "./imageNotFound.png"


export default function FoodItems(){  
    const [fetchedData, setfetchedData] = useState([]);
    const [initalData, setInitalData] = useState([]);
    const [sortedData, setSortedData] = useState();
    const [location, setLocation] = useState();

useEffect(()=>{
    facade.fetchDataFoodWasteByPostnummer().then(data => setfetchedData(data)) 
    setInitalData([...fetchedData])
    if (window.navigator.geolocation) {
      window.navigator.geolocation
       .getCurrentPosition(getLocations);
        } 
     
        function getLocations(position){
             const {coords} = position;
             setLocation(coords)
        }

    
},[])

console.log(fetchedData)

return (<div><button onClick={() => {setSortedData(undefined)}}>Reset</button> <button onClick={() => setSortedData(sortAfterPrice([...initalData]))}>Sort after price</button> <button onClick={() => setSortedData(sortAfterDiscount([...initalData]))}>Sort after discount</button> <button onClick={() => setSortedData(sortAfterDistance([...initalData], location.latitude, location.longitude))}>Sort after distance</button><FoodItem fetchedData={sortedData ? sortedData : fetchedData}/> </div>);




function FoodItem({fetchedData}) {
    let brandPhoto;
  
    let returned = fetchedData.map((data) => 
    {

if(data.clearances.length === 0){
    return null;
}else{
 
if(data.store.brand === "netto"){
    brandPhoto = NettoLogo
}    

if(data.store.brand === "foetex"){
    brandPhoto = FoetexLogo
}  
       
      return (
   
   <div>
    <img src={brandPhoto} alt="" style={{width:"30%"}}></img> 
       <h3> {data.store.name}</h3>
       <p></p>
      <p>{data.store.address.street}, {data.store.address.zip} {data.store.address.city}</p>
     

        {data.clearances.map((data) => {
    
   
   
    return( 
    
    <div style={{display: "inline-block"} }>
    
      <Popup modal trigger={
    
    <div className="card" onClick={()=> {console.log(data.product.description)}} key={data.product.ean}   >
    
    <img className="photo" src={data.product.image ? data.product.image : imageNotFound} alt="" ></img> 
     <div className="container">
     <h1 className="description" style={{}}>{data.product.description}</h1>    
     <p className="price" style={{fontWeight: "bold", color:"black"}}> {data.offer.newPrice} kr.</p>
    </div>
    </div>
    }>
     <h1 className="description">>{data.product.description}</h1>    
       <p className="price" style={{fontWeight: "bold", color:"black"}}> Nuværende Pris: {data.offer.newPrice} kr.</p>
       <p className="price">Original Pris: {data.offer.originalPrice} kr.</p>
       <p className="price">Prisforskel: {data.offer.discount} kr.</p>
       <p className="price">Besparelse: {data.offer.percentDiscount} %</p>
       <p>Varen udløber:</p>
       <p>d. {data.offer.endTime.replace(/T/g, " ").substring(0,19)}</p>
    <p>Der er {data.offer.stock} tilbage</p>
    
  
      </Popup>
    
    </div>
    
    ) 
       })  
}
    
  
      </div>
      );
      }
    });
    return returned;
  }
  



  // MARK: Sort funktioner //

function sortAfterPrice(data){
    let d = [...data]
    const sortedData = d.map((foodwaste) => {

        let sortedClearences = foodwaste.clearances.sort((a,b ) => a.offer.newPrice - b.offer.newPrice)
            foodwaste.clearances = sortedClearences
                
                return foodwaste
               })

    return sortedData
}

function sortAfterDiscount(data){



    const sortedData = data.map((foodwaste) => {

        let sortedClearences = foodwaste.clearances.sort((a,b ) => a.offer.discount - b.offer.discount)
            foodwaste.clearances = sortedClearences

              return foodwaste   
              })

    return sortedData
}

function sortAfterDistance(data, latitude, longitude){


const sortedData = data.sort((a,b) => {
    
    let distanceA = getdistance(a.store.coordinates[1], a.store.coordinates[0], latitude, longitude) 
    let distanceB = getdistance(b.store.coordinates[1], b.store.coordinates[0], latitude, longitude) 

    return distanceA - distanceB
})

  console.log(sortedData)
    return sortedData;
}


function getdistance(lat1, lon1, lat2, lon2) {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
      dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344 // To get from miles to km

  return dist
}}
