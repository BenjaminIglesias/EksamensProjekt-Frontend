import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Popup from 'reactjs-popup';
import mapIcon from "./icons/google-maps-1-555382.png"

 function MapContainer(props) {
   
    return (
     
        <Popup modal trigger={
    
        <img className="showmapBut" src={mapIcon}/>
     
        }>

    <div style={{ height:"400px"}}> 

    <div style={{width:"100%", height:"50px", backgroundColor:"#333", textAlign:"center"}}>
        <h1 style={{margin:"0px", color:"white"}}>{props.name}</h1>
    </div>
     <Map style={{ width: "49.2vw", height:"350px"}}
        google={props.google}
        zoom={13}
        initialCenter={{ lat: props.loc[1], lng: props.loc[0]}}
      >

        <Marker  position={{
                lat: props.loc[1],
                lng: props.loc[0]
               }}       
            />
     </Map></div>
     
     </Popup>
    
    );
}


export default GoogleApiWrapper({
apiKey: 'AIzaSyCunj796I1bgwBya4LAU-UlWjfCbmuNoeo'
})(MapContainer);