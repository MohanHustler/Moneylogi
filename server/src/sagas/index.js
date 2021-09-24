import { all } from 'redux-saga/effects';

import { watchManagePincode } from '../containers/manage-pincode/manage-pincode-saga';
import { watchManageUsers } from '../containers/manage-users/manage-users-saga';
import { watchManageProfession } from '../containers/manage-profession/manage-profession-saga';
import { watchManageBank } from '../containers/manage-bank/manage-bank-saga';
import { watchprofileDetails } from '../containers/profile/profile-details-saga';
import { watchSignin } from '../containers/sign-in/signin-saga';
import { watchchangePassword } from '../containers/change-password/change-password-saga';
import { watchRoleList } from '../containers/manage-users/role-list-saga';
import { watchaddUser } from '../containers/manage-users/add-user-saga';
import { watchAddCallLogs } from '../containers/profile/add-call-logs-saga';
import { watchEditUser } from '../containers/manage-users/edit-user-saga';
import { watchGeneratePassword } from '../containers/manage-users/generate-password-saga';
import { watchEditBank } from '../containers/manage-bank/edit-bank-saga';
import { watchBankDetails } from '../containers/manage-bank/bank-details-saga';
import { watchuserAddress } from '../containers/profile/user-address-saga';
import { watchStateList } from '../containers/profile/state-list-saga';
import { watchAddAddress } from '../containers/profile/add-address-saga';
import { watchEditPincode } from '../containers/manage-pincode/edit-pincode-saga';
import { watchResetPassword } from '../containers/reset-password/reset-password-saga';
import { watchFileUpload } from '../containers/profile/file-upload-saga';
import { watchCallLogs } from '../containers/profile/call-logs-saga';
import { watchUserProfile } from '../containers/profile/user-profile-saga';
import { watchEmi } from '../containers/emi/emi-saga';
import { watchLoan } from '../containers/loan/loan-saga';
import { watchLoanInfo } from '../containers/loan-information/loan-information-saga';
import { watchCollection } from '../containers/collections/collections-saga';
import { watchDefaults } from '../containers/defaults/defaults-saga';
import { watchPayments } from '../containers/payments/payments-saga';
import { watchDisbursment } from '../containers/disbursment/disbursment-saga';
import { watchDashboard } from '../containers/dashboard/dashboard-saga';
import { watchRecentActivity } from '../containers/dashboard/recent-activity-saga';
import { watchNewRegistration } from '../containers/dashboard/new-registration-saga';
import { watchExportCsv } from '../containers/dashboard/export-csv-saga';
import { watchDashboardCard } from '../containers/dashboard/dashboard-card-saga';
import { watchUploadDocs } from '../containers/profile/upload-docs-saga';
import { watchBlockUser } from '../containers/profile/block-unblock-saga';
import { watchViewFile } from '../containers/dashboard/view-file-saga';
import { watchPaymentDetails } from '../components/side-bar/payment-details-saga';

const sagas = function* sagas() {
  yield all([
    watchManagePincode(),
    watchManageUsers(),
    watchManageProfession(),
    watchManageBank(),
    watchprofileDetails(),
    watchSignin(),
    watchchangePassword(),
    watchRoleList(),
    watchaddUser(),
    watchEditUser(),
    watchGeneratePassword(),
    watchEditBank(),
    watchBankDetails(),
    watchuserAddress(),
    watchStateList(),
    watchAddAddress(),
    watchAddCallLogs(),
    watchCallLogs(),
    watchEditPincode(),
    watchResetPassword(),
    watchFileUpload(),
    watchEmi(),
    watchLoan(),
    watchLoanInfo(),
    watchCollection(),
    watchDefaults(),
    watchPayments(),
    watchDisbursment(),
    watchDashboard(),
    watchRecentActivity(),
    watchNewRegistration(),
    watchExportCsv(),
    watchDashboardCard(),
    watchUploadDocs(),
    watchBlockUser(),
    watchUserProfile(),
    watchViewFile(),
    watchPaymentDetails(),
  ]);
};

export default sagas;
