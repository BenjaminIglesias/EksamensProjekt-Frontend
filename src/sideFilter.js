import React, { useState, useEffect } from "react";



export default function SideFilter({setSortedData, data, latitude, longitude}){

        const [resetBut, setResetBut] = useState("checked")
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
            setSortedData(undefined)
            break;
     
          case "price":
            setResetBut("unchecked");
            setpriceBut("checked")
            setdiscountBut("unchecked")
            setdistanceBut("unchecked")
            setSortedData(sortAfterPrice([...data]))
            break;
     
          case "discount":
            setResetBut("unchecked");
            setpriceBut("unchecked")
            setdiscountBut("checked")
            setdistanceBut("unchecked")
            setSortedData(sortAfterDiscount([...data]))
            break;
     
          case "distance":
            setResetBut("unchecked");
            setpriceBut("unchecked")
            setdiscountBut("unchecked")
            setdistanceBut("checked")
            setSortedData(sortAfterDistance([...data], latitude, longitude))
            break;
        
      }
         
       }

return (

   
    <div className="sideFilter">
   <h3>Sorter efter</h3>
<div> <button className={resetBut} onClick={() => selectSort("default")}> </button> <p>Default</p> </div>
        <div className="sideLine"></div>
        <div> <button className={priceBut} onClick={() => selectSort("price")} ></button> Pris </div>
        <div> <button className={discountBut} onClick={() => selectSort("discount")} ></button> Besparelse </div>
        <div> <button className={distanceBut} onClick={() => selectSort("distance")}></button> Afstand </div>
   
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

        let sortedClearences = foodwaste.clearances.sort((a,b ) => b.offer.percentDiscount - a.offer.percentDiscount)
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
