import React from 'react';

import { Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { uploadFile } from '../../../containers/profile/file-upload-action';

import ArrowIconDownGray from '../../../../images/icons/arrowIcondownGray.png';
import CloseIconGray from '../../../../images/icons/closeIconGray.svg';

const FileUpload = ({
  closeUploadDocumentPopup,
  docType,
  setDocType,
  docFront,
  setDocFront,
  docBack,
  setDocBack,
  setFrontDocumentId,
  setBackDocumentId,
  handleUploadFile,
  showFrontSide,
  setShowFrontSide,
  showBackSide,
  setShowBackSide,
  markValid,
  setMarkValid,
  verifyDocNumber,
  setVerifyDocNumber,
}) => {
  const dispatch = useDispatch();

  const uploadDocsCallBack = (profilePicId, side) => {
    if (side === 'front-side') {
      setFrontDocumentId(profilePicId);
    } else if (side === 'back-side') {
      setBackDocumentId(profilePicId);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.name === 'front-side') {
      setDocFront(e.target.files[0]);
      const formData = new FormData();

      formData.append('file', e.target.files[0]);
      uploadFile(
        { formData, side: 'front-side', uploadDocsCallBack },
        dispatch
      );
      setShowFrontSide(true);
    } else if (e.target.name === 'back-side') {
      setDocBack(e.target.files[0]);
      const formData = new FormData();

      formData.append('file', e.target.files[0]);
      uploadFile({ formData, side: 'back-side', uploadDocsCallBack }, dispatch);
      setShowBackSide(true);
    }
  };

  return (
    <div className="upload-doc">
      <h1>UPLOAD DOCUMENT</h1>
      <Form>
        <div className="upload-doc-input-container">
          <div className="filter-select-value">
            <label className="filter-input-title">Document Type</label>
            <Form.Control
              as="select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option>Aadhaar Card</option>
              <option>Pan Card</option>
              <option>Passport</option>
              <option>Driving Licence</option>
              <option>Voter Card</option>
              <option>Bank Statement</option>
              <option>Salary Slip</option>
              <option>Appointment Letter</option>
              <option>Profile Picture</option>
            </Form.Control>
            <div className="downarrow-img">
              <img alt="forget-password" src={ArrowIconDownGray} />
            </div>
          </div>
        </div>
        <div className="upload-doc-input-container upload-doc-text-container">
          <label className="filter-input-title">Upload Front Side</label>
          <Form.Control
            type="file"
            name="front-side"
            id="file-front"
            className="upload-doc-file-input"
            onChange={(e) => handleFileSelect(e)}
          />
          <label htmlFor="file-front" className="upload-doc-text">
            <p>
              <span className="upload-doc-browse-file">Browse file</span> or
              drop file here
            </p>
            Only <span className="upload-doc-file-type">.jpg, .png</span> file
            allowed
          </label>
        </div>
        <div className="upload-doc-input-container upload-doc-text-container">
          <label className="filter-input-title">Upload Back Side</label>
          <Form.Control
            type="file"
            name="back-side"
            id="file-back"
            className="upload-doc-file-input"
            onChange={(e) => handleFileSelect(e)}
          />
          <label htmlFor="file-back" className="upload-doc-text">
            <p>
              <span className="upload-doc-browse-file">Browse file</span> or
              drop file here
            </p>
            Only <span className="upload-doc-file-type">.jpg, .png</span> file
            allowed
          </label>
        </div>

        {showFrontSide && (
          <div className="uploaded-doc-message">
            <ul className="uploaded-doc-details">
              <li>{docFront.name}</li>
              <li>{`${Math.ceil(docFront.size / 1024)}kb`}</li>
              <li>
                <img
                  src={CloseIconGray}
                  onClick={() => setShowFrontSide(false)}
                />
              </li>
              <li style={{ visibility: 'hidden' }}>Retry</li>
            </ul>
          </div>
        )}
        {showBackSide && (
          <div>
            <ul className="uploaded-doc-details">
              <li>{docBack.name}</li>
              <li>{`${Math.ceil(docBack.size / 1024)}kb`}</li>
              <li>
                <img
                  src={CloseIconGray}
                  onClick={() => setShowBackSide(false)}
                />
              </li>
              <li style={{ visibility: 'hidden' }}>Retry</li>
            </ul>
          </div>
        )}
        {markValid && (
          <div className="fliter-input-value">
            <label className="filter-input-title">{`${
              docType.split(' ')[0]
            } Number`}</label>
            <Form.Control
              required
              type="text"
              placeholder={`Enter Your ${docType.split(' ')[0]} Number`}
              value={verifyDocNumber}
              onChange={(e) => setVerifyDocNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {`Please enter ${docType.split(' ')[0]} Number.`}
            </Form.Control.Feedback>
          </div>
        )}
      </Form>

      <div className="upload-doc-buttons">
        <button
          className="black-border-btn file-upload-btn"
          onClick={() => setMarkValid(!markValid)}
        >
          SUBMIT WITH MARK VALID
        </button>
        <button
          className="cancel-btn file-upload-btn"
          onClick={closeUploadDocumentPopup}
        >
          Cancel
        </button>
        <button
          className="black-border-btn file-upload-btn"
          onClick={(e) => handleUploadFile(e)}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
