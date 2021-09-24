import {
  NEW_REGISTRATION_REQUEST,
  NEW_REGISTRATION_SUCCESS,
  NEW_REGISTRATION_FAILURE,
} from './dashboard-constants';

const initialState = {
  fetchingNewRegistration: false,
  newRegistrationDetails: [],
};

const newRegistration = (state = initialState, action) => {
  switch (action.type) {
    case NEW_REGISTRATION_REQUEST:
      return {
        ...state,
        fetchingNewRegistration: true,
      };
    case NEW_REGISTRATION_FAILURE:
      return {
        ...state,
        fetchingNewRegistration: false,
      };
    case NEW_REGISTRATION_SUCCESS:
      return {
        ...state,
        fetchingNewRegistration: false,
        newRegistrationDetails: action.data,
      };
    default:
      return state;
  }
};

export default newRegistration;
