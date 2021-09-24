export const DASHBOARD_REQUEST = 'DASHBOARD_REQUEST';
export const DASHBOARD_SUCCESS = 'DASHBOARD_SUCCESS';
export const DASHBOARD_FAILURE = 'DASHBOARD_FAILURE';

export const DASHBOARD_CARD_REQUEST = 'DASHBOARD_CARD_REQUEST';
export const DASHBOARD_CARD_SUCCESS = 'DASHBOARD_CARD_SUCCESS';
export const DASHBOARD_CARD_FAILURE = 'DASHBOARD_CARD_FAILURE';

export const RECENT_ACTIVITY_REQUEST = 'RECENT_ACTIVITY_REQUEST';
export const RECENT_ACTIVITY_SUCCESS = 'RECENT_ACTIVITY_SUCCESS';
export const RECENT_ACTIVITY_FAILURE = 'RECENT_ACTIVITY_FAILURE';

export const NEW_REGISTRATION_REQUEST = 'NEW_REGISTRATION_REQUEST';
export const NEW_REGISTRATION_SUCCESS = 'NEW_REGISTRATION_SUCCESS';
export const NEW_REGISTRATION_FAILURE = 'NEW_REGISTRATION_FAILURE';

export const EXPORT_CSV_REQUEST = 'EXPORT_CSV_REQUEST';
export const EXPORT_CSV_SUCCESS = 'EXPORT_CSV_SUCCESS';
export const EXPORT_CSV_FAILURE = 'EXPORT_CSV_FAILURE';

export const VIEW_FILE_REQUEST = 'VIEW_FILE_REQUEST';
export const VIEW_FILE_SUCCESS = 'VIEW_FILE_SUCCESS';
export const VIEW_FILE_FAILURE = 'VIEW_FILE_FAILURE';

export const dashboardFilters = [
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
    placeholder: 'paid',
    type: 'text',
  },
];
