import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoutes from './custom-routes/private-routes';

import SignIn from './containers/sign-in';
import ForgotPassword from './containers/forgot-password';
import ChangePassword from './containers/change-password';
import ResetPassword from './containers/reset-password';

import Dashboard from './containers/dashboard';
import Profile from './containers/profile';
import Loan from './containers/loan';
import LoanInformation from './containers/loan-information';
import Users from './containers/users';
import ManageUsers from './containers/manage-users';
import Disbursment from './containers/disbursment';
import Payments from './containers/payments';
import Defaults from './containers/defaults';
import Emi from './containers/emi';
import Collections from './containers/collections';
import NotFound404 from './public/not-found-404';
import ManageBank from './containers/manage-bank';
import ManageProfession from './containers/manage-profession';
import ManagePincode from './containers/manage-pincode';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={(props) => <SignIn {...props} />} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <PrivateRoutes exact path="/changepassword" component={ChangePassword} />
      <PrivateRoutes exact path="/resetpassword" component={ResetPassword} />

      <PrivateRoutes exact exact path="/" component={Dashboard} />
      <PrivateRoutes exact path="/dashboard" component={Dashboard} />
      <PrivateRoutes exact path="/users/:id" component={Profile} />
      <PrivateRoutes exact path="/loan" component={Loan} />
      <PrivateRoutes
        exact
        path="/loaninformation/:id"
        component={LoanInformation}
      />
      <PrivateRoutes exact path="/users" component={Users} />
      <PrivateRoutes exact path="/manageusers" component={ManageUsers} />
      <PrivateRoutes exact path="/disbursment" component={Disbursment} />
      <PrivateRoutes exact path="/payments" component={Payments} />
      <PrivateRoutes exact path="/defaults" component={Defaults} />
      <PrivateRoutes exact path="/emi" component={Emi} />
      <PrivateRoutes exact path="/collections" component={Collections} />
      <PrivateRoutes exact path="/managebanks" component={ManageBank} />
      <PrivateRoutes
        exact
        path="/manageprofession"
        component={ManageProfession}
      />
      <PrivateRoutes exact path="/managepincode" component={ManagePincode} />

      <Route exact path="*" component={NotFound404} />
    </Switch>
  </Router>
);

export default Routes;
