import facade from "./apiFacade";
import React, { useState, useEffect } from "react";



export default function FoodItems(){  
    const [fetchedData, setfetchedData] = useState([]);
    const [sortedData, setSortedData] = useState();
    const [location, setLoctioan] = useState([]);
useEffect(()=>{

    facade.fetchDataFoodWasteByPostnummer().then(data => setfetchedData(data))

    if (window.navigator.geolocation) {
        window.navigator.geolocation
         .getCurrentPosition(getLocations);
          } 
       
          function getLocations(position){
               const {coords} = position;
               setLoctioan(coords)
          }

          
},[])



return( <div><button onClick={() => setSortedData(undefined)}>reset</button> <button onClick={() => setSortedData(sortAfterPrice([...fetchedData]))}>sortprice</button> <button onClick={() => setSortedData(sortAfterDistance([...fetchedData], location.latitude, location.latitude))}>sort</button><FoodItem fetchedData={sortedData != undefined ? sortedData : fetchedData}/></div> );




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
}
function sortAfterPrice(data){

    const sortedData = data.map((foodwaste) => {

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

sortedData.map((data) => data)
    return sortedData;
}


function FoodItem({fetchedData}) { 
   console.log("foodItem")
   console.log(fetchedData)
    let returned = fetchedData.map((data) => 
    {

if(data.clearances.length === 0){
    return null;
}else{
    
       
      return (
          <div key={data.store.name}>
       <h3> {data.store.name}</h3>
       <h3> {data.clearances.map((data) => {
       return( 
     <div key={data.product.ean}>
     <p>{data.product.description}</p>   
      <img src={data.product.image}></img> 
       <p>{data.offer.newPrice}</p>
       
       <p>{data.offer.discount}</p>
      </div>
      )

    } 
       )
}</h3>
    
      

        

      </div>
      );
      }
    });
    return returned;
  }