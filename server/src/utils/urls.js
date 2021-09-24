import config from '../../config';

const portal = document.querySelector('.app');

export const IDENTITY_SERVICE_URL = portal.getAttribute(
  'data-identity-service-url'
)
  ? portal.getAttribute('data-identity-service-url')
  : config.IDENTITY_SERVICE_URL;

export const FILE_SERVICE_URL = portal.getAttribute('data-file-service-url')
  ? portal.getAttribute('data-file-service-url')
  : config.FILE_SERVICE_URL;

export const LOAN_SERVICE_URL = portal.getAttribute('data-loan-service-url')
  ? portal.getAttribute('data-loan-service-url')
  : config.LOAN_SERVICE_URL;

export const BANKING_SERVICE_URL = portal.getAttribute(
  'data-banking-service-url'
)
  ? portal.getAttribute('data-banking-service-url')
  : config.BANKING_SERVICE_URL;

export const REPORTING_SERVICE_URL = portal.getAttribute(
  'data-reporting-service-url'
)
  ? portal.getAttribute('data-reporting-service-url')
  : config.REPORTING_SERVICE_URL;

// URL parameter helper.
const attachParams = (baseUrl, params) => {
  const url = new URL(baseUrl);

  url.search = new URLSearchParams(params).toString();
  return url;
};

export const LOGIN_URL = `${IDENTITY_SERVICE_URL}/login`;

export const CHANGE_PASSWORD_URL = `${IDENTITY_SERVICE_URL}/change-password`;

export const RESET_PASSWORD_URL = `${IDENTITY_SERVICE_URL}/set-password`;

export const ROLE_LIST_URL = `${IDENTITY_SERVICE_URL}/role`;

export const STATE_LIST_URL = `${IDENTITY_SERVICE_URL}/state`;

export const ADD_USER_URL = `${IDENTITY_SERVICE_URL}/users`;

export const ADD_CALL_LOGS_URL = `${IDENTITY_SERVICE_URL}/call-log`;

export const UPLOAD_PROFILE_PIC_URL = `${IDENTITY_SERVICE_URL}/profile-pic`;

export const manageUsersUrl = (params = null) => {
  const manageUsersBaseUrl = `${REPORTING_SERVICE_URL}/users`;

  if (params) {
    return attachParams(manageUsersBaseUrl, params);
  }
  return manageUsersBaseUrl;
};

export const callLogsUrl = (params = null) => {
  const callLogsBaseUrl = `${REPORTING_SERVICE_URL}/call-log`;

  if (params) {
    return attachParams(callLogsBaseUrl, params);
  }
  return callLogsBaseUrl;
};

export const managePincodeUrl = (params = null) => {
  const managePincodeBaseUrl = `${REPORTING_SERVICE_URL}/pincode`;

  if (params) {
    return attachParams(managePincodeBaseUrl, params);
  }
  return managePincodeBaseUrl;
};

export const manageProfessionUrl = (params = null) => {
  const manageProfessionBaseUrl = `${REPORTING_SERVICE_URL}/profession`;

  if (params) {
    return attachParams(manageProfessionBaseUrl, params);
  }
  return manageProfessionBaseUrl;
};

export const profileDetailsUrl = (userId) => {
  const PROFILE_DETAILS_URL = `${IDENTITY_SERVICE_URL}/profile/${userId}`;

  return PROFILE_DETAILS_URL;
};

export const blockUserUrl = (userId) => {
  const BLOCK_USER_URL = `${IDENTITY_SERVICE_URL}/blocked-unblocked-user/${userId}`;

  return BLOCK_USER_URL;
};

export const loanInfoUrl = (loanId) => {
  const LOAN_INFO_URL = `${LOAN_SERVICE_URL}/loan/${loanId}`;

  return LOAN_INFO_URL;
};

export const userAddressUrl = (userAddressId) => {
  const USER_ADDRESS_URL = `${IDENTITY_SERVICE_URL}/user-address/${userAddressId}`;

  return USER_ADDRESS_URL;
};

export const addAddressUrl = (addAddressId) => {
  const ADD_ADDRESS_URL = `${IDENTITY_SERVICE_URL}/user-address/${addAddressId}`;

  return ADD_ADDRESS_URL;
};

export const editUserUrl = (editUserId) => {
  const EDIT_USER_URL = `${IDENTITY_SERVICE_URL}/users/${editUserId}`;

  return EDIT_USER_URL;
};

export const generatePasswordUrl = (publicId) => {
  const GENERATE_PASSWORD_URL = `${IDENTITY_SERVICE_URL}/reset-password/${publicId}`;

  return GENERATE_PASSWORD_URL;
};

export const editPincodeUrl = (editPincodeId) => {
  const EDIT_PINCODE_URL = `${IDENTITY_SERVICE_URL}/pincode/${editPincodeId}`;

  return EDIT_PINCODE_URL;
};

// FILE SERVICE URLS
export const FILE_UPLOAD_URL = `${FILE_SERVICE_URL}/file`;

export const EMI_URL = `${LOAN_SERVICE_URL}/emi`;

export const emiUrl = (params = null) => {
  const emiBaseUrl = `${REPORTING_SERVICE_URL}/loan-detail`;

  if (params) {
    return attachParams(emiBaseUrl, params);
  }
  return emiBaseUrl;
};

export const paymentDetailsUrl = (params = null) => {
  const paymentDetailsBaseUrl = `${REPORTING_SERVICE_URL}/collection`;

  if (params) {
    return attachParams(paymentDetailsBaseUrl, params);
  }
  return paymentDetailsBaseUrl;
};

export const viewFileUrl = (profilePicId) => {
  const emiBaseUrl = `${FILE_SERVICE_URL}/file/${profilePicId}`;

  return emiBaseUrl;
};

export const recentActivityUrl = (params = null) => {
  const recentAcitityBaseUrl = `${REPORTING_SERVICE_URL}/recent-acitity`;

  if (params) {
    return attachParams(recentAcitityBaseUrl, params);
  }
  return recentAcitityBaseUrl;
};

export const newRegistrationUrl = (params = null) => {
  const newRegistrationBaseUrl = `${REPORTING_SERVICE_URL}/users`;

  if (params) {
    return attachParams(newRegistrationBaseUrl, params);
  }
  return newRegistrationBaseUrl;
};

export const exportCsvUrl = (params = null, exportUrl) => {
  const exportCsvBaseUrl = `${REPORTING_SERVICE_URL}/${exportUrl}/export/csv`;

  if (params) {
    return attachParams(exportCsvBaseUrl, params);
  }
  return exportCsvBaseUrl;
};

export const disbursmentUrl = (params = null) => {
  const disbursmentBaseUrl = `${REPORTING_SERVICE_URL}/loan`;

  if (params) {
    return attachParams(disbursmentBaseUrl, params);
  }
  return disbursmentBaseUrl;
};

export const loanUrl = (params = null) => {
  const loanBaseUrl = `${REPORTING_SERVICE_URL}/loan`;

  if (params) {
    return attachParams(loanBaseUrl, params);
  }
  return loanBaseUrl;
};

export const collectionUrl = (params = null) => {
  const collectionBaseUrl = `${REPORTING_SERVICE_URL}/collection`;

  if (params) {
    return attachParams(collectionBaseUrl, params);
  }
  return collectionBaseUrl;
};

export const defaultsUrl = (params = null) => {
  const defaultsBaseUrl = `${REPORTING_SERVICE_URL}/loan-detail`;

  if (params) {
    return attachParams(defaultsBaseUrl, params);
  }
  return defaultsBaseUrl;
};

export const paymentsUrl = (params = null) => {
  const paymentsBaseUrl = `${REPORTING_SERVICE_URL}/payment`;

  if (params) {
    return attachParams(paymentsBaseUrl, params);
  }
  return paymentsBaseUrl;
};

export const DASHBOARD_CARD_URL = `${LOAN_SERVICE_URL}/dashboard`;

// BANKING SERVICE URLS
export const MANAGE_BANK_URL = `${BANKING_SERVICE_URL}/banks`;

export const manageBankUrl = (params = null) => {
  const manageBankBaseUrl = `${REPORTING_SERVICE_URL}/banks`;

  if (params) {
    return attachParams(manageBankBaseUrl, params);
  }
  return manageBankBaseUrl;
};

export const bankDetailsUrl = (publicId) => {
  const bankDetailsBaseUrl = `${BANKING_SERVICE_URL}/banks/${publicId}`;

  return bankDetailsBaseUrl;
};

export const editBankUrl = (bankId) => {
  const EDIT_BANK_URL = `${BANKING_SERVICE_URL}/banks/${bankId}`;

  return EDIT_BANK_URL;
};
