import {Link} from 'react-router-dom'

import React, { useState, useEffect } from "react";
import postnummer from "./postnummer.js";

export default function Content(props){
    const [changer, setChanger] = useState("");
    const [redirectAllowed, setRedirectAllowed] = useState(false);
    
    ;
    function handleChange(event) {
        // Here, we invoke the callback with the new value
         props.onChange(event.target.value);
         if(postnummer.hasOwnProperty(event.target.value)){
            setChanger([event.target.value] + " er et korrekt postnummer for  " + postnummer[event.target.value]+ " du kan nu gå videre")
            console.log(changer)
            setRedirectAllowed(true);
         }else{setChanger("Det indtastet er ikke et korrekt postnummer")
        setRedirectAllowed(false);
        }
        
    }


let link = "/";

if(redirectAllowed){
    link = "/Products"
}else{ link = "/"}

return(
<div>
    <h1 style={{textAlign:"center", fontFamily: "cursive" }} >Velkommen til FoodSaver</h1>
    <h3 style={{textAlign:"center", fontFamily: "cursive"}}>Indtast dit postnummer nedenunder</h3>
<h5 style={{textAlign:"center", fontFamily: "cursive" }} >{changer}</h5>
<div className="block">

    <input type="text"  className="input-res" value={props.value} onChange={handleChange} maxLength="4"/>
    
<Link to={link}
>
<button onClick={()=>{if(redirectAllowed !== true){ alert("Indtast først et korrekt postnummer")}}} className="btn sky block circular">Vis</button>
</Link>
</div>

<br/>
<h3 style={{textAlign:"left", fontFamily: "cursive",  transform: "rotate(15deg)"
}}>For din pengepungs og miljøets skyld!</h3>

<h3 style={{textAlign:"right", fontFamily: "cursive",  transform: "rotate(-15deg)"
}}>Datovarer fra din lokale Netto, Føtex eller Bilka butik</h3>



</div>
    


    ) 
}
