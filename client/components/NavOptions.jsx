import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Register from './Register.jsx';
import * as actions from '../actions/actions.js';


const mapStateToProps = store => ({
    registrationIsOpen: store.dumbletour.registrationIsOpen,
    itinerary: store.dumbletour.itinerary
});



const mapDispatchToProps = dispatch =>({
    startRegistration: e => dispatch(actions.startRegistration()),
    completeRegistration: e => dispatch(actions.completeRegistration())
});

class NavOptions extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <Fragment>
            {Object.keys(this.props.itinerary).length !== undefined ? 
            <div>{Object.keys(this.props.itinerary).length}</div> : null}
            {/* <Register startRegistration={this.props.startRegistration} completeRegistration={this.props.completeRegistration}/> */}
            {/* <Login/>
            <Itinerary/>
            <Cart/> */}
            </Fragment>
        )
    }

   
 }

export default connect(mapStateToProps, mapDispatchToProps)(NavOptions);