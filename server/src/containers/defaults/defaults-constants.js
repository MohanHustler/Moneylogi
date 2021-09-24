export const DEFAULTS_REQUEST = 'DEFAULTS_REQUEST';
export const DEFAULTS_SUCCESS = 'DEFAULTS_SUCCESS';
export const DEFAULTS_FAILURE = 'DEFAULTS_FAILURE';

export const defaultFilters = [
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
