import {Link} from 'react-router-dom'

import React, { useState, useEffect } from "react";
let postalCode = "";

export default function Content(props){

    function handleChange(event) {
        // Here, we invoke the callback with the new value
         props.onChange(event.target.value);
        
    }

return(
<div>
    <h1 style={{textAlign:"center", fontFamily: "cursive" }} >Velkommen til FoodSaver</h1>
    <h3 style={{textAlign:"center", fontFamily: "cursive"}}>Indtast dit postnummer nedenunder</h3>
<div className="block">
    <input type="text" className="input-res" value={props.value} onChange={handleChange} maxLength="4"/>
    
<Link to={{pathname: '/Products'
}} >
<button className="btn sky block circular">Vis</button>
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

   