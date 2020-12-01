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


export default function FoodItems(){  
    const [fetchedData, setfetchedData] = useState([]);
    const [initalData, setInitalData] = useState([]);
    const [sortedData, setSortedData] = useState();
    const [location, setLocation] = useState({longitude : 0.0, latitude :0.0});

useEffect(()=>{
    facade.fetchDataFoodWasteByPostnummer().then(data => {setfetchedData(data);  setInitalData(data) }) 
  
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
<SortDropdown  setSortedData={setSortedData}
                            data={initalData} 
                            latitude={location.latitude} 
                            longitude={location.longitude} />
 <h1>Tilbud under postnummert 2800 </h1>


</div>
<SideFilter/>
<MapContainerAll data={fetchedData} initLoc={[{lat:54, lng:12.4}]} />
 
  <FoodItem fetchedData={sortedData ? sortedData : fetchedData} location={location}/> </div>);

}


function FoodItem({fetchedData, location}) {
    let brandPhoto;
  
    let returned = fetchedData.map((data, index) => 
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
    
    ) 
       })  
}
  
      </div>
      );
      }
    });
    return returned;
  }
  


function SortDropdown({setSortedData, data, latitude, longitude}){

  const [title, setTitle] = useState("Sorting after default >")

  function selectSort(sort){
   setTitle("Sorting after " + sort)

   switch (sort) {
     case "default":
       setSortedData(undefined)
       break;

     case "price":
       setSortedData(sortAfterPrice([...data]))
       break;

     case "discount":
       setSortedData(sortAfterDiscount([...data]))
       break;

     case "distance":
       setSortedData(sortAfterDistance([...data], latitude, longitude))
       break;
   }
    
  }

  return (
<div className="dropdown">
  <button className="dropbtn">{title}</button>
  <div className="dropdown-content">
  <button onClick={() => selectSort("default")}>Reset sort</button>
    <button onClick={() => selectSort("price")}>Sort after Price</button>
    <button onClick={() => selectSort("discount")} >Sort after Discount</button>
    <button onClick={() => selectSort("distance")} >Sort af distance</button>
  </div>
</div>

  );
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
}
