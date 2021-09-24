import {
  VIEW_FILE_REQUEST,
  VIEW_FILE_SUCCESS,
  VIEW_FILE_FAILURE,
} from './dashboard-constants';

const initialState = {
  fileDetails: {},
  isFetching: false,
};

const viewFile = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_FILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case VIEW_FILE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case VIEW_FILE_SUCCESS:
      return {
        ...state,
        fileDetails: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default viewFile;
