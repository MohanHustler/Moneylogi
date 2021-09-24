export const MANAGE_USERS_REQUEST = 'MANAGE_USERS_REQUEST';
export const MANAGE_USERS_SUCCESS = 'MANAGE_USERS_SUCCESS';
export const MANAGE_USERS_FAILURE = 'MANAGE_USERS_FAILURE';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const GENERATE_PASSWORD_REQUEST = 'GENERATE_PASSWORD_REQUEST';
export const GENERATE_PASSWORD_SUCCESS = 'GENERATE_PASSWORD_SUCCESS';
export const GENERATE_PASSWORD_FAILURE = 'GENERATE_PASSWORD_FAILURE';

export const ROLE_LIST_REQUEST = 'ROLE_LIST_REQUEST';

export const rolesList = [
  { name: 'user', value: 1 },
  { name: 'admin', value: 2 },
];
export const cityList = [
  { label: 'Delhi', value: 1 },
  { label: 'Chandigarh', value: 2 },
  { label: 'Allahabad', value: 3 },
];

export const manageUserFilters = [
  {
    name: 'Name',
    placeholder: 'Rahul Kumar',
    type: 'text',
  },
  {
    name: 'Mobile Number',
    placeholder: '9876543263',
    type: 'number',
  },
  {
    name: 'Role',
    options: rolesList,
    type: 'select',
  },
  // {
  //   name: 'City',
  //   options: cityList,
  //   type: 'multiSelect',
  // },
  {
    name: 'Date Created',
    type: 'dateRange',
  },
  {
    name: 'Email',
    placeholder: 'admin@moneyloji.com',
    type: 'text',
  },
];
