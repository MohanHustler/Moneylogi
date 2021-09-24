import {
  MANAGE_PROFESSION_REQUEST,
  MANAGE_PROFESSION_SUCCESS,
  MANAGE_PROFESSION_FAILURE,
} from './manage-profession-constants';

const initialState = {
  error: false,
  isFetching: false,
  professionDetails: [],
  totalRecords: '',
};

const manageProfession = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_PROFESSION_REQUEST:
      return {
        ...state,
        isFetching: true,
        professionDetails: [],
      };
    case MANAGE_PROFESSION_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
        professionDetails: [],
      };
    case MANAGE_PROFESSION_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        professionDetails: action.data,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default manageProfession;
