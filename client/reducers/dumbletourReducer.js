import * as types from '../actions/actionTypes';

const initialState = {
  user: 'Samantha W.',
  registrationIsOpen: false,
  searchBoxIsOpen: true,
  location: '',
  cityLat: '', 
  cityLong: '', 
  arrivalDate: '',
  departureDate: '',
  searchResults: [],
  itinerary: {},
};

const dumbletourReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_REGISTRATION: {
      const registrationIsOpen = true;
      return {
        ...state,
        registrationIsOpen,
      };
    }

    case types.COMPLETE_REGISTRATION: {
      const registrationIsOpen = false;
      return {
        ...state,
        registrationIsOpen,
      };
    }
    case types.UPDATE_LOCATION: {
      const location = action.payload;
      return {
        ...state,
        location,
      };
    }

    case types.SUBMIT_SEARCH: {
      const searchBoxIsOpen = false;
      const toLog = {
        ...state,
        searchBoxIsOpen,
      };
      return toLog;
    }

    case types.UPDATE_ARRIVAL_DATE: {
      const arrivalDate = action.payload;
      return {
        ...state,
        arrivalDate,
      };
    }

    case types.UPDATE_DEPARTURE_DATE: {
      const departureDate = action.payload;
      return {
        ...state,
        departureDate,
      };
    }

    case types.PROCESS_SEARCH_RESULTS: {
      console.log("payload is...", action.payload);

      const cityLatAndLong = action.payload.map((result) => ({
        cityLat: result.lat, 
        cityLong: result.long,
      }))
      const transformedResults = action.payload.map((result) => ({
        // imgUrl: '../assets/randomHogwarts.jpg',
        // imgUrl: result.photoReference,
        address: result.vicinity,
        name: result.name,
        rating: result.rating,
        lat: result.lat,
        long: result.long,
        //price: event.price,
        //www: 'www.expelliarmus.aragog',
        //ig: event.hashtag.toLowerCase(),
      }));
      const searchBoxIsOpen = false;
      return {
        ...state,
        cityLat: cityLatAndLong[0].cityLat,
        cityLong: cityLatAndLong[1].cityLong,
        searchResults: [...transformedResults],
        searchBoxIsOpen,
      };
    }

    case types.ADD_TO_ITINERARY: {
      const id = action.payload;
      const { itinerary } = state;
      itinerary[id] = { date: undefined, time: undefined };
      return {
        ...state,
        itinerary: { ...itinerary },
      };
    }

    default:
      return state;
  }
};

export default dumbletourReducer;
