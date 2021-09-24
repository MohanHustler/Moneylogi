import config from '../../config';

const portal = document.querySelector('.app');

// eslint-disable-next-line import/prefer-default-export
export const IDENTITY_SERVICE_URL = portal
  ? portal.getAttribute('data-identity-service-url')
  : config.URL_IDENTITY_SERVICE;
export const STORAGE_KEY = 'web_employee_user';

export const rolesList = [
  { name: 'user', value: 1 },
  { name: 'admin', value: 2 },
];
export const cityList = [
  { label: 'Delhi', value: 1 },
  { label: 'Chandigarh', value: 2 },
  { label: 'Allahabad', value: 3 },
];

// Sample UI Constants

export const statusList = [
  { label: 'Pending', value: 1 },
  { label: 'Active', value: 2 },
  { label: 'Deleted', value: 3 },
];

export const address = [
  {
    area: 'Mayur Vihar, ',
    city: 'NewDelhi, ',
    country: 'India - ',
    flatno: 'D-23, Third floor, ',
    pincode: '1110090',
    state: 'Delhi, ',
  },
  {
    area: 'Mayur Vihar, ',
    city: 'NewDelhi, ',
    country: 'India - ',
    flatno: 'D-23, Third floor, ',
    pincode: '2110090',
    state: 'Delhi, ',
  },
  {
    area: 'Mayur Vihar, ',
    city: 'NewDelhi, ',
    country: 'India - ',
    flatno: 'D-23, Third floor, ',
    pincode: '3110090',
    state: 'Delhi, ',
  },
];
