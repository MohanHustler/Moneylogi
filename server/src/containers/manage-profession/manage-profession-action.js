import {
  MANAGE_PROFESSION_REQUEST,
  MANAGE_PROFESSION_SUCCESS,
  MANAGE_PROFESSION_FAILURE,
} from './manage-profession-constants';

const manageProfessionRequest = (urlParams) => ({
  type: MANAGE_PROFESSION_REQUEST,
  urlParams,
});

export const manageProfessionSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: MANAGE_PROFESSION_SUCCESS,
});
export const manageProfessionFailure = () => ({
  type: MANAGE_PROFESSION_FAILURE,
});

export const manageProfession = async (urlParams, dispatch) => {
  dispatch(manageProfessionRequest(urlParams));
};
