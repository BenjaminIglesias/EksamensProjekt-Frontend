import React, { useState, useEffect } from "react";



export default function SideFilter(){

        const [resetBut, setResetBut] = useState("unchecked")
        const [priceBut, setpriceBut] = useState("unchecked")
        const [discountBut, setdiscountBut] = useState("unchecked")
        const [distanceBut, setdistanceBut] = useState("unchecked")
   


    function selectSort(sort){

     
        switch (sort) {
          case "default":
            setResetBut("checked");
            setpriceBut("unchecked")
            setdiscountBut("unchecked")
            setdistanceBut("unchecked")
            break;
     
          case "price":
            setResetBut("unchecked");
            setpriceBut("checked")
            setdiscountBut("unchecked")
            setdistanceBut("unchecked")
            break;
     
          case "discount":
            setResetBut("unchecked");
            setpriceBut("unchecked")
            setdiscountBut("checked")
            setdistanceBut("unchecked")
            break;
     
          case "distance":
            setResetBut("unchecked");
            setpriceBut("unchecked")
            setdiscountBut("unchecked")
            setdistanceBut("checked")
            break;
        }
         
       }

return (

   
    <div className="sideFilter">
   <h3>STORES</h3>
<div> <button className={resetBut} onClick={() => selectSort("default")}> </button> <p>All</p> </div>
        <div className="sideLine"></div>
        <div> <button className={priceBut} onClick={() => selectSort("price")} ></button> Netto </div>
        <div> <button className={discountBut} onClick={() => selectSort("discount")} ></button> Føtex </div>
        <div> <button className={distanceBut} onClick={() => selectSort("distance")}></button> Bilka </div>
   
    </div>

  
);

}

/*
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
  } */