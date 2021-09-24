import React from 'react';

import { Form } from 'react-bootstrap';

const DeleteWithReason = ({
  closeDeleteWithReasonPopup,
  handleDeleteWithreason,
}) => {
  return (
    <div>
      <div className="block-user">
        <h1>DELETE</h1>
        <Form className="block-user-reason">
          <div className="custom-input">
            <label>Reason to delete</label>
            <Form.Control
              as="textarea"
              placeholder="write reason to delete data"
            />
          </div>
        </Form>

        <div className="delete-reason-button">
          <label>
            <button className="cancel-btn" onClick={closeDeleteWithReasonPopup}>
              Cancel
            </button>
          </label>
          <span>
            <button
              className="black-border-btn"
              onClick={handleDeleteWithreason}
            >
              OK
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeleteWithReason;
