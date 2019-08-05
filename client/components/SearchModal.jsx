import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = (store) => ({
    searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
    location: store.dumbletour.location,
    arrivalDate: store.dumbletour.arrivalDate,
    departureDate: store.dumbletour.departureDate,
    longitude: store.dumbletour.longitude,
    latitude: store.dumbletour.latitude
});

const mapDispatchToProps = dispatch =>({
    handleKey:(e) => {
        dispatch(actions.updateLocation(e.target.value))
    },
    handleArrivalDate:(e) =>{
        dispatch(actions.updateArrivalDate(e.target.value))
    },

    handleDepartureDate: (e) =>{
        dispatch(actions.updateDepartureDate(e.target.value))
    },

    submitSearch: (e) => {
        e.preventDefault();
        dispatch(actions.submitSearch());
    }
})   

class SearchModal extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <span className="search-modal">
          <form className="search-form">
            <label>
              Experience destination ?
            <input type='text' value={this.props.location} onChange={(e) => this.props.handleKey(e)} placeholder='City'></input>
            </label>
            <label>
            When are you going?
            <input type='date' value={this.props.arrivalDate} onChange={(e) => this.props.handleArrivalDate(e)}></input>
            </label>
            <label>
            Coming back?
            <input type='date'value={this.props.departureDate} onChange={(e) => this.props.handleDepartureDate(e)}></input>
            </label>
            <button onClick={(e)=> this.props.submitSearch(e)}>Accio Adventure!</button>
          </form>
        </span>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);