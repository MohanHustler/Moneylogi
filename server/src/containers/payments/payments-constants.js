export const PAYMENTS_REQUEST = 'PAYMENTS_REQUEST';
export const PAYMENTS_SUCCESS = 'PAYMENTS_SUCCESS';
export const PAYMENTS_FAILURE = 'PAYMENTS_FAILURE';

export const paymentFilters = [
  {
    name: 'Loan Number',
    placeholder: 'ML-001230',
    type: 'text',
  },
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
    name: 'EMI Number',
    placeholder: '4',
    type: 'number',
  },
  {
    name: 'EMI Due Date',
    type: 'dateRange',
  },
  {
    name: 'Value',
    placeholder: '45100',
    type: 'number',
  },
  {
    name: 'Status',
    placeholder: 'active',
    type: 'text',
  },
];
