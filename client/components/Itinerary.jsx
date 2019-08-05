import React, { Component, Fragment } from 'react';


const Itinerary = props =>(
    <div className="itinerary">
      {/* <img src={props.imgUrl}></img> */}
      <h2>Your Itinerary</h2>
      <div className="tripdates">{props.arrivalDate} - {props.departureDate}</div>
      <div className="selected-attraction">{props.name}</div>
      <div className="card-price">{props.price}</div>
      {/* WANT TO CLOSE ITINERARY HERE: */}
      <button className="add-button" id={props.id} onClick={(e) => props.showItinerary(e.target.itineraryVisible)}>X</button>
    </div> 
  )
  

  export default Itinerary;