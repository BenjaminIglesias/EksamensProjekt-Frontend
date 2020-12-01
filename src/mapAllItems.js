import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Popup from 'reactjs-popup';
import mapIcon from "./icons/googlemapIcon.png"

 function MapContainer(props) {
   

    let locationArray = {lng:"1",lat:"2"}
    const [storeName, setStoreName] = useState("Butikker med tilbud");
     locationArray = getAllLoctions(props.data).filter((data)=>{
        return data;
     })
   
    
    return (
     
        <Popup modal trigger={
            <div className="showmapAllBut">
                <h4>Show stores on map</h4>
   <img style={{width:"50%", cursor:"pointer"}} src={mapIcon}/>
            </div>
     
        }>

    <div style={{ height:"400px"}}> 

    <div style={{width:"100%", height:"50px", backgroundColor:"#333", textAlign:"center"}}>
        <h1 style={{margin:"0px", color:"white"}}>{storeName}</h1>
    </div>
     <Map style={{ width: "49.2vw", height:"350px"}}
        google={props.google}
        zoom={12}
        initialCenter={{ lat: 55.69, lng: 12.56}}
      >

          {locationArray.map((data, index)=>{
              if(data !== undefined){
                return(
                    <Marker  key={index} position={{
                        lat: data.lat,
                        lng: data.lng
                       }}       
                     onClick={() => setStoreName(data.name)}/>
                )
            }
          })}
          
      
     </Map></div>
     
     </Popup>
    
    );
}



function getAllLoctions(data){

    let locationArray = data.map((data, index) => 
    {

if(data.clearances.length === 0){
    return;
}else{

    return ({
            name: data.store.name,
            lat:data.store.coordinates[1],
            lng:data.store.coordinates[0]
    }
       
    )

    }
    })
  
  return locationArray;
}


export default GoogleApiWrapper({
apiKey: 'AIzaSyCunj796I1bgwBya4LAU-UlWjfCbmuNoeo'
})(MapContainer);