import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchModal from './SearchModal.jsx'
import ResultCard from './ResultCard.jsx'
import MapContainer from './Map.jsx'
import * as actions from '../actions/actions.js';

const mapStateToProps = (store) => ({
  searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
  location: store.dumbletour.location,
  arrivalDate: store.dumbletour.arrivalDate,
  departureDate: store.dumbletour.departureDate,
  searchResults: store.dumbletour.searchResults,
  itinerary: store.dumbletour.itinerary,
  inputLat: store.dumbletour.cityLat,
  inputLong: store.dumbletour.cityLong
}); 

const mapDispatchToProps = dispatch =>({
  addToItineraryRequest: (id) => {
    dispatch(actions.addToItineraryRequest(id));
}});  

class MainBody extends Component{
    constructor(props){
        super(props);
    }
    render(){
        // transform raw results into jsx tagslos anglees
        const resultCards = this.props.searchResults.map((r) => {
          return <ResultCard  key={r.name} 
                              imgUrl={r.imgUrl}
                              name={r.name} 
                              rating={r.rating}
                              vicinity={r.address}
                              ig={r.ig}
                              id={r.id}
                              lat={r.lat}
                              long ={r.long}
                              itineraryItems={Object.keys(this.props.itinerary)}
                              addToItinerary={this.props.addToItineraryRequest}/>;});
        return(
        <div className={this.props.searchBoxIsOpen ? "main-body-with-modal": "main-body-without-modal" }>
          {this.props.searchBoxIsOpen ? 
          <Fragment>
            <SearchModal />
          </Fragment>
          // Append Map to top of MainBody
          : <MapContainer searchResults={this.props.searchResults} lat={this.props.inputLat} long={this.props.inputLong} />}
          <section className="result-cards">
          {resultCards}
          </section>
        </div>
        )
    }
 }

export default connect(mapStateToProps, mapDispatchToProps) (MainBody);