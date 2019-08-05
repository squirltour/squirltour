import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Register from './Register.jsx';
import * as actions from '../actions/actions.js';
//import Itinerary from './Itinerary.jsx';


const mapStateToProps = store => ({
    registrationIsOpen: store.dumbletour.registrationIsOpen,
    itinerary: store.dumbletour.itinerary,
    itineraryVisible: store.dumbletour.itineraryVisible,
    addToItineraryRequest: store.dumbletour.addToItineraryRequest,
    itinerary: store.dumbletour.itinerary,
    arrivalDate: store.dumbletour.arrivalDate,
    departureDate: store.dumbletour.departureDate

});



const mapDispatchToProps = dispatch =>({
    startRegistration: e => dispatch(actions.startRegistration()),
    completeRegistration: e => dispatch(actions.completeRegistration()),
    showItinerary: (e) =>{
        //e.preventDefault();
        dispatch(actions.showItinerary());
      }
});

class NavOptions extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const itinerary = this.props.itinerary.map((r) =>{
            return <Itinerary>
            {<h2>Your Itinerary</h2>}
            tripdates= {this.props.arrivalDate} - {this.props.departureDate}
            attraction={this.props.name}
            price={this.props.price}
            className="card-price">{props.price}
            {/* WANT TO CLOSE ITINERARY HERE: */}
            {<button className="add-button" id={props.id} onClick={(e) => props.showItinerary(e.target.itineraryVisible)}>X</button>}
            </Itinerary>
        })
        return(
            <div className="itinerary">
            {this.props.itineraryVisible ? 
                <Fragment>
                    {itinerary}
                </Fragment>
            : null}
            <section className="cart">
                    {Object.keys(this.props.itinerary).length !== undefined ? 
                    <div>{Object.keys(this.props.itinerary).length}</div> : null}
            </section>
            </div>
        )
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(NavOptions);