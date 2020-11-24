import facade from "./apiFacade";
import React, { useState, useEffect } from "react";



export default function FoodItems(){  
    const [fetchedData, setfetchedData] = useState([]);

useEffect(()=>{
    facade.fetchDataFoodWasteByPostnummer().then(data => setfetchedData(data))    
},[])




return<FoodItem fetchedData={fetchedData}/>;



}

function FoodItem({fetchedData}) {

    let returned = fetchedData.map((data) => 
    {

if(data.clearances.length === 0){
    return null;
}else{
    
       
      return (
          <div>
       <h3> {data.store.name}</h3>
       <h3> {data.clearances.map((data) => {
       return( 
     <div>
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