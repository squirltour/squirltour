import * as types from './actionTypes';

export const startRegistration = () => ({
  type: types.START_REGISTRATION,
});

export const completeRegistration = () => ({
  type: types.COMPLETE_REGISTRATION,
});

export const updateLocation = value => ({
  type: types.UPDATE_LOCATION,
  payload: value,
});

export const updateArrivalDate = value => ({
  type: types.UPDATE_ARRIVAL_DATE,
  payload: value,
});

export const updateDepartureDate = value => ({
  type: types.UPDATE_DEPARTURE_DATE,
  payload: value,
});

export const searchResults = results => ({
  type: types.PROCESS_SEARCH_RESULTS,
  payload: results,
});

export const addToItinerary = addedItem => ({
  type: types.ADD_TO_ITINERARY,
  payload: addedItem,
});

// thunk that handles search request
// Reconfigure this action to direct to empty squirtle database  ***************
//Make sure we're sending the correct info to Google to make the api request
export const submitSearch = () => (dispatch, getState) => {

// make sure this 

  const {
    location, latitude, longitude, arrivalDate, departureDate,
  } = getState().dumbletour;

  fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      location, latitude, longitude, arrivalDate, departureDate,
    }),
  })
    .then(res => res.json())
    .then(json => {

      dispatch(searchResults(json))
    });
};

// thunk that adds itinerary item
export const addToItineraryRequest = id => (dispatch, getState) => {
  const { user } = getState().dumbletour;

  fetch('/api/itinerary/add', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      user, id,
    }),
  })
    .then(() => dispatch(addToItinerary(id)));
};