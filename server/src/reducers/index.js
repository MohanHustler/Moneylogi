// @flow
import { combineReducers } from 'redux';

// Authentication Reducers.
import signin from '../containers/sign-in/signin-reducer';
import changePassword from '../containers/change-password/change-password-reducer';
import resetPassword from '../containers/reset-password/reset-password-reducer';

import manageUsers from '../containers/manage-users/manage-users-reducer';
import managePincode from '../containers/manage-pincode/manage-pincode-reducer';
import manageProfession from '../containers/manage-profession/manage-profession-reducer';
import manageBank from '../containers/manage-bank/manage-bank-reducer';
import profileDetails from '../containers/profile/profile-details-reducer';
import addUser from '../containers/manage-users/add-user-reducer';
import addCallLogs from '../containers/profile/add-call-logs-reducer';
import callLogs from '../containers/profile/call-logs-reducer';
import editUser from '../containers/manage-users/edit-user-reducer';
import generatePassword from '../containers/manage-users/generate-password-reducer';
import editBank from '../containers/manage-bank/edit-bank-reducer';
import bankDetails from '../containers/manage-bank/bank-details-reducer';
import userAddress from '../containers/profile/user-address-reducer';
import addAddress from '../containers/profile/add-address-reducer';
import blockUser from '../containers/profile/block-unblock-reducer';
import userProfile from '../containers/profile/user-profile-reducer';
import editPincode from '../containers/manage-pincode/edit-pincode-reducer';
import collection from '../containers/collections/collections-reducer';
import defaults from '../containers/defaults/defaults-reducer';
import emi from '../containers/emi/emi-reducer';
import loan from '../containers/loan/loan-reducer';
import loanInfo from '../containers/loan-information/loan-information-reducer';
import payments from '../containers/payments/payments-reducer';
import disbursment from '../containers/disbursment/disbursment-reducer';
import dashboard from '../containers/dashboard/dashboard-reducer';
import recentActivity from '../containers/dashboard/recent-activity-reducer';
import newRegistration from '../containers/dashboard/new-registration-reducer';
import exportCsv from '../containers/dashboard/export-csv-reducer';
import dashboardCard from '../containers/dashboard/dashboard-card-reducer';
import viewFile from '../containers/dashboard/view-file-reducer';
import uploadDocs from '../containers/profile/upload-docs-reducer';
import paymentDetails from '../components/side-bar/payment-details-reducer';

// Root Reducer.
const reducers = combineReducers({
  addAddress,
  addCallLogs,
  addUser,
  bankDetails,
  blockUser,
  callLogs,
  changePassword,
  collection,
  dashboard,
  dashboardCard,
  defaults,
  disbursment,
  editBank,
  editPincode,
  editUser,
  emi,
  exportCsv,
  generatePassword,
  loan,
  loanInfo,
  manageBank,
  managePincode,
  manageProfession,
  manageUsers,
  newRegistration,
  paymentDetails,
  payments,
  profileDetails,
  recentActivity,
  resetPassword,
  signin,
  uploadDocs,
  userAddress,
  userProfile,
  viewFile,
});

export default reducers;
