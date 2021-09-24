import React from 'react';

import { Form } from 'react-bootstrap';
import AddFields from './add-fields';

import CloseIconGray from '../../../images/icons/closeIconGray.svg';

const Filter = ({
  closeFilterCallBack,
  handleApplyFilter,
  clearFilterValues,
  filterOptions,
  getFilterState,
  filterChangeHandler,
  addFiled,
  setAddFiled,
}) => {
  const addNewField = () => {
    setAddFiled([...addFiled, filterOptions[0].name]);
  };

  const removeField = (arrIndex) => {
    setAddFiled(addFiled.filter((item, index) => index !== arrIndex));
  };

  return (
    <div className="filter-sec">
      <div className="filter-header">
        <div className=" close-filter">
          <label onClick={closeFilterCallBack}>
            <img src={CloseIconGray} />
          </label>
          <h2>FILTER</h2>
        </div>
        <button className="black-border-btn add-btn" onClick={addNewField}>
          Add fields
        </button>
      </div>
      <div className="filter-form-sec">
        <Form>
          {addFiled.map((fileld, index) => (
            <AddFields
              key={index}
              index={index}
              removeField={removeField}
              filterOptions={filterOptions}
              getFilterState={getFilterState}
              filterChangeHandler={filterChangeHandler}
              handleApplyFilter={handleApplyFilter}
              newField={fileld}
              addFiled={addFiled}
              setAddFiled={setAddFiled}
            />
          ))}
        </Form>
      </div>
      <div className="filter-bottom">
        <button className="cancel-btn filter-btn" onClick={clearFilterValues}>
          Clear
        </button>
        <button
          className="black-border-btn filter-btn"
          onClick={handleApplyFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
