import facade from "./apiFacade";
import React, { useState, useEffect } from "react";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NettoLogo from "./logos/netto.png";
import FoetexLogo from "./logos/foetex.png"


export default function FoodItems(){  
    const [fetchedData, setfetchedData] = useState([]);

useEffect(()=>{
    facade.fetchDataFoodWasteByPostnummer().then(data => setfetchedData(data))    
},[])




return <FoodItem fetchedData={fetchedData}/>;




}

function FoodItem({fetchedData}) {
    let brandPhoto;
    const [show, setShow] = useState(false);
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
    
    <img className="photo" src={data.product.image} alt="" ></img> 
     <div className="container">
     <h1 className="description" style={{}}>{data.product.description}</h1>    
     <p className="price" style={{fontWeight: "bold", color:"black"}}> {data.offer.newPrice} kr.</p>
    </div>
    </div>
    }>
       <p className="price" style={{fontWeight: "bold", color:"black"}}> Nuværende Pris: {data.offer.newPrice} kr.</p>
       <p className="price">Original Pris: {data.offer.originalPrice} kr.</p>
       <p className="price">Prisforskel: {data.offer.discount} kr.</p>
       <p className="price">Besparingsprocent: {data.offer.percentDiscount} %</p>
       <p>Udløber:</p>
       <p>{data.offer.endTime.replace(/T/g, " ").substring(0,19)}</p>
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
  