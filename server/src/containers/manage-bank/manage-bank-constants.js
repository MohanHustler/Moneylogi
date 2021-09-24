export const MANAGE_BANK_REQUEST = 'MANAGE_BANK_REQUEST';
export const MANAGE_BANK_SUCCESS = 'MANAGE_BANK_SUCCESS';
export const MANAGE_BANK_FAILURE = 'MANAGE_BANK_FAILURE';

export const EDIT_BANK_REQUEST = 'EDIT_BANK_REQUEST';
export const EDIT_BANK_SUCCESS = 'EDIT_BANK_SUCCESS';
export const EDIT_BANK_FAILURE = 'EDIT_BANK_FAILURE';

export const BANK_DETAILS_REQUEST = 'BANK_DETAILS_REQUEST';
export const BANK_DETAILS_SUCCESS = 'BANK_DETAILS_SUCCESS';
export const BANK_DETAILS_FAILURE = 'BANK_DETAILS_FAILURE';

export const manageBankFilters = [
  {
    name: 'Bank Name',
    placeholder: 'ICICI Bank',
    type: 'text',
  },
  {
    name: 'Ifsc Code',
    placeholder: 'ICIC',
    type: 'text',
  },
  {
    name: 'Finbit Code',
    placeholder: 'ICIC',
    type: 'text',
  },
  {
    name: 'Razorpay Code',
    placeholder: 'ICIC',
    type: 'text',
  },
  {
    name: 'Status',
    placeholder: 'active',
    type: 'text',
  },
];
