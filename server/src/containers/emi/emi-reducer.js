import { EMI_REQUEST, EMI_SUCCESS, EMI_FAILURE } from './emi-constants';

const initialState = {
  emiDetails: [],
  isFetching: false,
  totalRecords: '',
};

const emi = (state = initialState, action) => {
  switch (action.type) {
    case EMI_REQUEST:
      return {
        ...state,
        emiDetails: [],
        isFetching: true,
      };
    case EMI_FAILURE:
      return {
        ...state,
        emiDetails: [],
        isFetching: false,
      };
    case EMI_SUCCESS:
      return {
        ...state,
        emiDetails: action.data,
        isFetching: false,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default emi;
