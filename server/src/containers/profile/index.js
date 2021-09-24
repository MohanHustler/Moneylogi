/* eslint-disable max-lines */
/* eslint-disable sort-keys */

/*
 * Skipped max line rule for time being.
 * Will be resolved during functional development.
 */
import React, { useState, Fragment, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Breadcrumb, Modal, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import ProfileImg from '../../../images/profile.png';
import CloseIconWhite from '.../../../images/icons/closeIconWhite.svg';
import ArrowIcondownGray from '../../../images/icons/arrowIcondownGray.png';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import FileUpload from '../../components/Profile/file-upload';
import ProfileDetailsTab from '../../components/Profile/profile-details-tab';
import AddressDetails from '../../components/Address/address-details';
import AddAddress from '../../components/Address/add-address';
import EditAddress from '../../components/Address/edit-address';
import LoanEligibilityCheck from '../../components/Profile/loan-eligibility';
import DeleteWithReason from '../../components/Users/delete-with-reason';
import Footer from '../../components/footer';
import { userProfileDetails } from './user-profile-details-action';
import { userProfile } from './user-profile-action';
import { userAddress } from './user-address-action';
import { uploadDocs } from './upload-docs-action';
import { blockUser } from './block-unblock-action';
import PageLoader from '../../components/Loaders/page-loader';

import { address } from '../../constants';
import { toCapitalizeFirstLetter, toDateFormat } from '../../utils/formattor';

const Profile = ({ match }) => {
  // File Upload
  const [fileUploadPopup, setFileUploadPopup] = useState(false);
  // Address view/edit
  const [addressDetailPopup, setAddressDetailPopup] = useState(false);
  // Establish view/edit
  const [establishmentShowPopup, setEstablishmentShowPopup] = useState(false);
  // Bank Details view/edit
  const [editShowPopup, setEditShowPopup] = useState(false);
  // Check Eligibility
  const [eligibility, setEligibility] = useState(false);
  // View, Add, Edit
  const [viewAddressDetail, setViewAddressDetail] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddressDetail, setEditAddressDetail] = useState(false);

  // Block User
  const [isUserBlocked, setIsUserBlocked] = useState(false);

  const [deleteWithReason, setDeleteWithReason] = useState(false);

  // Edit & Update User Handle
  const [editUserType, setEditUserType] = useState(false);
  const [editSalarySlab, setEditSalarySlab] = useState(false);

  const [userType, setUserType] = useState('Salaried');
  const [salarySlab, setSalarySlab] = useState('20,000.00 - 30,000.00');

  // Error Handle
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Side Bar
  const [show, setShow] = useState(false);

  // browseFlie
  const [docType, setDocType] = useState('Aadhaar Card');
  const [docFront, setDocFront] = useState(null);
  const [docBack, setDocBack] = useState(null);
  const [frontDocumentId, setFrontDocumentId] = useState('');
  const [backDocumentId, setBackDocumentId] = useState('');
  const [showFrontSide, setShowFrontSide] = useState(false);
  const [showBackSide, setShowBackSide] = useState(false);
  const [markValid, setMarkValid] = useState(false);
  const [verifyDocNumber, setVerifyDocNumber] = useState('');

  // edit
  const [addressCrud] = useState(address);
  const [currentAddressCrud, setcurrentAddressCrud] = useState({
    area: '',
    city: '',
    country: '',
    flatno: '',
    pincode: '',
    state: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const userId = path[path.length - 1];

    if (userId) {
      userProfileDetails(userId, dispatch);
      userProfile(userId, dispatch);
      userAddress(userId, dispatch);
    } else if (match.params.id) {
      userProfileDetails(match.params.id, dispatch);
      userProfile(userId, dispatch);
      userAddress(match.params.id, dispatch);
    }
  }, []);

  const { profileData, isFetching } = useSelector(
    (state) => state.profileDetails
  );

  const { userProfileData } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (profileData.employmentType) {
      setUserType(profileData.employmentType);
    }
  }, [profileData.employmentType]);

  useEffect(() => {
    if (userProfileData.status && userProfileData.status === 'blocked') {
      setIsUserBlocked(true);
    } else {
      setIsUserBlocked(false);
    }
  }, [userProfileData.status]);

  const { userAddressDetails } = useSelector((state) => state.userAddress);

  const updateProfileDetails = (payload) => {
    uploadDocs(
      payload,
      match.params.id,
      profileData.concurrencyStamp,
      dispatch
    );
  };

  const updateUserType = () => {
    if (editUserType) {
      const payload = { employmentType: userType };

      updateProfileDetails(payload);
    }
    setEditUserType(!editUserType);
  };

  const updateSalarySlab = () => {
    if (editSalarySlab) {
      const monthlyIncome = salarySlab.split('-');
      const payload = {
        maxMonthlyIncome: Number(monthlyIncome[1].trim()),
        minMonthlyIncome: Number(monthlyIncome[0].trim()),
      };

      updateProfileDetails(payload);
    }
    setEditSalarySlab(!editSalarySlab);
  };

  const addClassCallBack = () => {
    setShow(!show);
  };

  // Address
  const addAddressDetailHandle = () => {
    setAddressDetailPopup(false);
    setViewAddressDetail(true);
  };
  const editAddressDetailHandle = () => {
    setAddressDetailPopup(false);
    setEditAddressDetail(true);
  };

  // Establish
  const vieweEstablishHandle = () => {
    setEstablishmentShowPopup(false);
    setViewAddressDetail(true);
  };
  const editEstablishHandle = () => {
    setEstablishmentShowPopup(false);
    setEditAddressDetail(true);
  };

  const closeAddressDetailsPopup = () => {
    setViewAddressDetail(false);
  };

  const closeEditDetailsPopup = () => {
    setEditAddressDetail(false);
  };

  const closeEligibilityPopup = () => {
    setEligibility(false);
  };

  // Open Add Address in View Address
  const addAddressPopupShow = () => setAddAddress(true);

  const closeAndOpenAddAddressPopup = () => {
    setViewAddressDetail(false);
    addAddressPopupShow();
  };

  // Edit Handler

  const editHandler = (data) => {
    const updatedItems = address;
    const index = updatedItems.findIndex((obj) => obj.id === data.id);

    updatedItems[index].flatno = data.flatno;
    updatedItems[index].area = data.area;
    updatedItems[index].city = data.city;
    updatedItems[index].state = data.state;
    updatedItems[index].country = data.country;
    updatedItems[index].pincode = data.pincode;

    setcurrentAddressCrud({
      area: data.area,
      city: data.city,
      country: data.country,
      flatno: data.flatno,
      pincode: data.pincode,
      state: data.state,
    });

    setViewAddressDetail(false);
    setEditAddressDetail(true);
  };

  const handleUploadFile = () => {
    if (backDocumentId && frontDocumentId) {
      if (docType === 'Aadhaar Card') {
        if (markValid && verifyDocNumber) {
          updateProfileDetails({
            aadharBackDocumentId: backDocumentId,
            aadharFrontDocumentId: frontDocumentId,
            aadharNumber: verifyDocNumber,
            aadharDocumentStatus: 'verified',
          });
        } else {
          updateProfileDetails({
            aadharBackDocumentId: backDocumentId,
            aadharFrontDocumentId: frontDocumentId,
          });
        }
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Pan Card') {
        if (markValid && verifyDocNumber) {
          updateProfileDetails({
            panFrontDocumentId: frontDocumentId,
            panBackDocumentId: backDocumentId,
            panNumber: verifyDocNumber,
            panDocumentStatus: 'verified',
          });
        } else {
          updateProfileDetails({
            panFrontDocumentId: frontDocumentId,
            panBackDocumentId: backDocumentId,
          });
        }
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Passport') {
        if (markValid && verifyDocNumber) {
          updateProfileDetails({
            passportFrontDocumentId: frontDocumentId,
            passportBackDocumentId: backDocumentId,
            passportNumber: verifyDocNumber,
            passportDocumentStatus: 'verified',
          });
        } else {
          updateProfileDetails({
            passportFrontDocumentId: frontDocumentId,
            passportBackDocumentId: backDocumentId,
          });
        }
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Driving Licence') {
        if (markValid && verifyDocNumber) {
          updateProfileDetails({
            drivingLicenceBackDocumentId: backDocumentId,
            drivingLicenceFrontDocumentId: frontDocumentId,
            drivingLicenceNumber: verifyDocNumber,
            drivingLicenceDocumentStatus: 'verified',
          });
        } else {
          updateProfileDetails({
            drivingLicenceBackDocumentId: backDocumentId,
            drivingLicenceFrontDocumentId: frontDocumentId,
          });
        }
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Voter Card') {
        if (markValid && verifyDocNumber) {
          updateProfileDetails({
            voterCardBackDocumentId: backDocumentId,
            voterCardFrontDocumentId: frontDocumentId,
            voterCardNumber: verifyDocNumber,
            voterCardDocumentStatus: 'verified',
          });
        } else {
          updateProfileDetails({
            voterCardBackDocumentId: backDocumentId,
            voterCardFrontDocumentId: frontDocumentId,
          });
        }
        setFileUploadPopup(!fileUploadPopup);
      }
    } else if (frontDocumentId || backDocumentId) {
      if (docType === 'Bank Statement') {
        updateProfileDetails({
          bankStatementDocumentId: frontDocumentId,
        });
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Salary Slip') {
        updateProfileDetails({
          salarySlipDocumentId: frontDocumentId,
        });
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Appointment Letter') {
        updateProfileDetails({
          appointmentLetterDocumentId: frontDocumentId,
        });
        setFileUploadPopup(!fileUploadPopup);
      } else if (docType === 'Profile Picture') {
        updateProfileDetails({
          profilePicId: frontDocumentId,
        });
        setFileUploadPopup(!fileUploadPopup);
      }
    }
  };

  const handleReload = () => {
    window.location.reload(false);
  };
  const blockUserSuccess = () => {
    setIsUserBlocked(!isUserBlocked);
  };
  const handleDeleteWithreason = () => {
    blockUser(match.params.id, blockUserSuccess, dispatch);
    setDeleteWithReason(false);
  };

  return (
    <div>
      {isFetching ? (
        <PageLoader />
      ) : (
        <Fragment>
          <Header />
          <div className="common-container">
            <SidebarIcon addClassCallBack={addClassCallBack} show={show} />
            <div className={`common-wrapper ${show ? 'active' : ''} `}>
              <div className="col-md-12 mpad">
                <div className="common-heading">
                  <h1>Profile</h1>
                  <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="row">
                <div className="mpad profile-details col-md-12 col-lg-3 ">
                  <div className="profile-details-container">
                    <div className="profile-image">
                      {profileData && profileData.profilePicId ? (
                        <img
                          alt="Profile Image"
                          src={`http://file-service-test.moneyloji.in/view-file/${profileData.profilePicId}`}
                        />
                      ) : (
                        <img alt="Profile Image" src={ProfileImg} />
                      )}
                    </div>
                    <label className="profile-referal">
                      Referal code
                      <span>
                        &nbsp;
                        {(profileData && profileData.referralCode) || '-'}
                      </span>
                    </label>
                    <label className="profile-referal">
                      Referal by<span>&nbsp;Siddhant</span>
                    </label>
                  </div>
                  <div className="profile-crif-score">
                    <div className="profile-crif-score-container">
                      <label>Crif Score</label>
                      <span>
                        {(profileData && profileData.crifScore) || '-'}
                      </span>
                    </div>
                    <div className="profile-crif-score-btn-container">
                      <button
                        onClick={handleReload}
                        className="black-border-btn black-border-reload"
                      >
                        Reload
                      </button>
                      <button className="black-border-btn black-border-reload">
                        Report
                      </button>
                    </div>
                  </div>
                  <div className="profile-upload-document">
                    <h5>UPLOAD DOCUMENT</h5>
                    <p>only .jpg, .png, .pdf file allowed</p>
                    <div className="profile-upload-document-btn">
                      <button
                        onClick={() => setFileUploadPopup(!fileUploadPopup)}
                        className="black-border-btn black-border-browse"
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                  <button
                    className="black-border-btn black-border-block"
                    onClick={() => setDeleteWithReason(!deleteWithReason)}
                  >
                    {!isUserBlocked ? 'Block User' : 'Unblock User'}
                  </button>
                </div>
                <div className="mpad personal-details col-md-12 col-lg-9">
                  {showErrorMessage && (
                    <div className="personal-details-error-msg">
                      <div className="personal-details-error-msg-heading">
                        <h4>ERROR MESSAGE HEADING</h4>
                        <CancelIcon
                          onClick={() => setShowErrorMessage(false)}
                          className="check-cancel-red error-check-cancel-red"
                        />
                      </div>
                      <p>
                        Error message text goes here. Error message text goes
                        here Error message text goes here Error message text
                        goes here Error message text goes here.
                      </p>
                    </div>
                  )}
                  <div className="personal-basic">
                    <h2 className="personal-username">
                      {(profileData && profileData.name) || '-'}
                    </h2>
                    <label className="personal-gender grey-label">
                      {(profileData &&
                        toCapitalizeFirstLetter(profileData.gender)) ||
                        '-'}
                    </label>
                  </div>
                  <div className="personal-user-data">
                    <div className="personal-user-data-container personal-user-user-type user-type">
                      <ul>
                        <li>
                          {!editUserType ? (
                            <Fragment>
                              <label>User Type</label>
                              <span>{userType}</span>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <label>User Type</label>
                              <Dropdown
                                onSelect={(e) => setUserType(e)}
                                className="personal-user-type-dropdown"
                              >
                                <Dropdown.Toggle
                                  variant="light"
                                  id="dropdown-basic"
                                >
                                  {userType && userType}
                                  <img src={ArrowIcondownGray} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item eventKey="Salaried">
                                    Salaried
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey="Self-Employed">
                                    Self-Employed
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Fragment>
                          )}
                        </li>
                        <li>
                          <label>Phone</label>
                          <span>
                            {(profileData && profileData.mobileNumber) || '-'}
                          </span>
                        </li>
                        <li>
                          <label>Date of Birth</label>
                          <span>
                            {(profileData && toDateFormat(profileData.dob)) ||
                              '-'}
                          </span>
                        </li>
                        <li>
                          <label>Qualification</label>
                          <span>
                            {(profileData && profileData.qualification) || '-'}
                          </span>
                        </li>
                      </ul>
                      <div>
                        <button
                          onClick={updateUserType}
                          className="black-border-btn black-border-edit"
                        >
                          {!editUserType ? 'Edit' : 'Done'}
                        </button>
                      </div>
                    </div>
                    <div className="personal-user-data-container personal-user-user-type">
                      <ul>
                        <li>
                          {!editSalarySlab ? (
                            <Fragment>
                              <label>Salary Slab</label>
                              <span>{salarySlab}</span>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <label>Salary Slab</label>
                              <Dropdown
                                onSelect={(e) => setSalarySlab(e)}
                                className="personal-salary-type-dropdown"
                              >
                                <Dropdown.Toggle
                                  variant="light"
                                  id="dropdown-basic"
                                >
                                  {salarySlab && salarySlab}
                                  <img src={ArrowIcondownGray} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item eventKey="30000 - 40000">
                                    30,000.00 - 40,000.00
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey="40000 - 50000">
                                    40,000.00 - 50,000.00
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey="50000 - 60000">
                                    50,000.00 - 60,000.00
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Fragment>
                          )}
                        </li>
                        <li>
                          <label>Primary Email</label>
                          <span>
                            {(profileData && profileData.primaryEmail) || '-'}
                          </span>
                        </li>
                        <li>
                          <label>Address Proof</label>
                          <span>Mohammad Reyazuddin</span>
                        </li>
                        <li>
                          <label>Marital Status</label>
                          <span>
                            {(profileData && profileData.maritalStatus) || '-'}
                          </span>
                        </li>
                      </ul>
                      <div>
                        <button
                          onClick={updateSalarySlab}
                          className="black-border-btn black-border-edit"
                        >
                          {!editSalarySlab ? 'Edit' : 'Done'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="personal-kyc">
                    <h4 className="personal-common-heading">KYC Details</h4>
                    <ul>
                      <li>
                        <label>PAN Number</label>
                        <span className="check-circle">
                          <CheckCircleIcon className="check-circle-green" />
                          {(profileData && profileData.panNumber) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>Aadhar Number</label>
                        <span className="check-circle">
                          <CheckCircleIcon className="check-circle-green" />
                          {(profileData && profileData.aadharNumber) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>Voter Card</label>
                        <span className="check-circle">
                          <CheckCircleIcon className="check-circle-green" />
                          {(profileData && profileData.voterCardNumber) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>Driving Licence Number</label>
                        <span className="check-cancel">
                          <CancelIcon className="check-cancel-red" />
                          {(profileData && profileData.drivingLicenceNumber) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Passport</label>
                        <span>
                          {(profileData && profileData.passportNumber) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>Address Proof</label>
                        <span className="check-circle">
                          <CheckCircleIcon className="check-circle-green" />
                          Electicity Bill
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="personal-address-details">
                    <div className="personal-heading-container">
                      <div className="d-flex align-items-baseline">
                        <h4 className="personal-common-heading">
                          Address Details
                        </h4>
                        <label className="ml-3 grey-label">Default</label>
                      </div>
                      <MoreVertIcon
                        onClick={() =>
                          setAddressDetailPopup(!addressDetailPopup)
                        }
                        className="more-vertical-icon"
                      />
                    </div>
                    {addressDetailPopup && (
                      <div className="profile-edit-view">
                        <p>
                          <label onClick={addAddressDetailHandle}>
                            View All
                          </label>
                          <label onClick={editAddressDetailHandle}>Edit</label>
                        </p>
                      </div>
                    )}
                    <ul>
                      <li>
                        <label>Type of Property</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].ownership) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Flat, House, Building No.</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].addressLine1) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Area, Locality, Street</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].addressLine2) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Landmark</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].landmark) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>City</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].districtName) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>State</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].stateName) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Pin Code</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].pincode) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Country</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].country) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Landline Number</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].telephoneNumber) ||
                            '-'}
                        </span>
                      </li>
                      <li>
                        <label>Staying Since</label>
                        <span>
                          {(userAddressDetails.length &&
                            userAddressDetails[0].stayingSince) ||
                            '-'}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {userType === 'Self-Employed' && (
                    <div className="personal-establisgment-details">
                      <div className="personal-heading-container">
                        <div className="d-flex align-items-baseline">
                          <h4 className="personal-common-heading custom-address-heading">
                            Establishment Address Details
                          </h4>
                          <label className="ml-3 grey-label">Default</label>
                        </div>
                        <MoreVertIcon
                          onClick={() =>
                            setEstablishmentShowPopup(!establishmentShowPopup)
                          }
                          className="more-vertical-icon"
                        />
                      </div>
                      {establishmentShowPopup && (
                        <div className="profile-edit-view">
                          <p>
                            <label onClick={vieweEstablishHandle}>
                              View All
                            </label>
                            <label onClick={editEstablishHandle}>Edit</label>
                          </p>
                        </div>
                      )}
                      <ul>
                        <li>
                          <label>Flat, House, Building No.</label>
                          <span>609, 6th floor, DLF City Court</span>
                        </li>
                        <li>
                          <label>Area, Locality, Street</label>
                          <span>Sikanpur</span>
                        </li>
                        <li>
                          <label>City</label>
                          <span>Gurgaon</span>
                        </li>
                        <li>
                          <label>State</label>
                          <span>Haryana</span>
                        </li>
                        <li>
                          <label>Pin Code</label>
                          <span>210096</span>
                        </li>
                        <li>
                          <label>Country</label>
                          <span>India</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="personal-bank-details">
                    <div className="personal-heading-container">
                      <div className="d-flex align-items-baseline">
                        <h4 className="personal-common-heading">
                          Bank Details
                        </h4>
                        <label className="ml-3 grey-label">Default</label>
                      </div>
                      <MoreVertIcon
                        onClick={() => setEditShowPopup(!editShowPopup)}
                        className="more-vertical-icon"
                      />
                    </div>
                    {/* VIEW/EDIT */}
                    {editShowPopup && (
                      <div className="profile-edit-view">
                        <p>
                          <label>View All</label>
                          <label>Edit</label>
                        </p>
                      </div>
                    )}

                    <ul>
                      <li>
                        <label>Account Type</label>
                        <span>
                          {(profileData && profileData.accountType) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>Account Number</label>
                        <span>
                          {(profileData && profileData.accountNumber) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>Account Holder Name</label>
                        <span>{(profileData && profileData.name) || '-'}</span>
                      </li>
                      {userType === 'Self-Employed' ? (
                        <li>
                          <label>Monthly Income</label>
                          <span>43,543.00</span>
                        </li>
                      ) : (
                        <li>
                          <label>Monthly Salary</label>
                          <span>43,543.00</span>
                        </li>
                      )}

                      <li>
                        <label>Bank Name</label>
                        <span>
                          {(profileData && profileData.bankName) || '-'}
                        </span>
                      </li>
                      <li>
                        <label>IFSC Code</label>
                        <span>{(profileData && profileData.ifsc) || '-'}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="personal-loan-settings">
                    <h4 className="personal-common-heading">Loan Settings</h4>
                    <div className="personal-max-loan-days">
                      <div className="personal-max-loan-days-count">
                        <p>Max Loan Day(s)</p>
                        <span>0 day(s)</span>
                      </div>
                      <button className="black-border-btn black-border-loan">
                        Edit
                      </button>
                    </div>
                    <div className="personal-loan-eligibility">
                      <p>Loan Eligibility Check </p>
                      <div className="personal-loan-eligibility-button">
                        <Form>
                          <div className="profli-page-coustom-input">
                            <Form.Control
                              autoComplete="off"
                              placeholder="Loan Amount"
                              type="number"
                            />
                            <Form.Control
                              autoComplete="off"
                              placeholder="Loan Tenure"
                              type="number"
                            />
                          </div>
                        </Form>
                        <button
                          className="black-border-btn"
                          onClick={() => setEligibility(true)}
                        >
                          Check Eligibility
                        </button>
                        <a className="personal-loan-eligibility-link">
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <ProfileDetailsTab />
                </div>
              </div>
            </div>
            <Footer show={show} />
            <div className={`common-side-bar ${show ? 'active' : ''} `}>
              <SideBar addClassCallBack={addClassCallBack} show={show} />
            </div>
          </div>
        </Fragment>
      )}

      {/* File Upload Modal */}
      <Modal
        show={fileUploadPopup}
        onHide={() => setFileUploadPopup(false)}
        animation={false}
        className="loan-eligible-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setFileUploadPopup(false)}>
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <FileUpload
            closeUploadDocumentPopup={() =>
              setFileUploadPopup(!fileUploadPopup)
            }
            docType={docType}
            setDocType={setDocType}
            docFront={docFront}
            setDocFront={setDocFront}
            docBack={docBack}
            setDocBack={setDocBack}
            handleUploadFile={handleUploadFile}
            setFrontDocumentId={setFrontDocumentId}
            setBackDocumentId={setBackDocumentId}
            showFrontSide={showFrontSide}
            setShowFrontSide={setShowFrontSide}
            showBackSide={showBackSide}
            setShowBackSide={setShowBackSide}
            markValid={markValid}
            setMarkValid={setMarkValid}
            verifyDocNumber={verifyDocNumber}
            setVerifyDocNumber={setVerifyDocNumber}
          />
        </Modal.Body>
      </Modal>

      {/* Check Eligibility Modal */}
      <Modal
        show={eligibility}
        onHide={() => setEligibility(false)}
        animation={false}
        className="loan-eligible-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setEligibility(false)}>
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <LoanEligibilityCheck closeEligibilityPopup={closeEligibilityPopup} />
        </Modal.Body>
      </Modal>
      {/* Add Address Details Modal */}
      <Modal
        show={addAddress}
        onHide={() => setAddAddress(false)}
        animation={false}
        className="delete-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setAddAddress(false)}>
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <AddAddress
            closeNewAddressPopup={() => setAddAddress(false)}
            publicId={match.params.id}
          />
        </Modal.Body>
      </Modal>
      {/* View Address Details Modal */}
      <Modal
        show={viewAddressDetail}
        onHide={() => setViewAddressDetail(false)}
        animation={false}
        className="loan-eligible-reason-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setViewAddressDetail(false)}
          >
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <AddressDetails
            closeAddressDetailsPopup={closeAddressDetailsPopup}
            closeAndOpenAddAddressPopup={closeAndOpenAddAddressPopup}
            editHandler={editHandler}
            addAddress={addressCrud}
          />
        </Modal.Body>
      </Modal>
      {/* Edit Address Details Modal */}
      <Modal
        show={editAddressDetail}
        onHide={() => setEditAddressDetail(false)}
        animation={false}
        className="loan-eligible-reason-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setEditAddressDetail(false)}
          >
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <EditAddress
            closeEditDetailsPopup={closeEditDetailsPopup}
            currentAddressCrud={currentAddressCrud}
          />
        </Modal.Body>
      </Modal>

      {/* Delete with reason Modal */}
      <Modal
        show={deleteWithReason}
        onHide={() => setDeleteWithReason(false)}
        animation={false}
        className="delete-reason-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setDeleteWithReason(false)}
          >
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <DeleteWithReason
            closeDeleteWithReasonPopup={() => setDeleteWithReason(false)}
            handleDeleteWithreason={handleDeleteWithreason}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
