import React, { useState, Fragment } from 'react';

import DateRangePicker from 'react-bootstrap-daterangepicker';

import moment from 'moment';

import { Form } from 'react-bootstrap';

import MultiSelect from '@khanacademy/react-multi-select';

import ArrowIconDownGray from '../../../images/icons/arrowIcondownGray.png';
import CloseIconRed from '../../../images/icons/closeIconRed.svg';

const AddFields = ({
  index,
  removeField,
  getFilterState,
  filterChangeHandler,
  filterOptions,
  handleApplyFilter,
  addFiled,
  setAddFiled,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(addFiled[index]);

  const selectFilter = (e) => {
    setSelectedFilter(e.target.value);
    const arr = addFiled;

    arr[index] = e.target.value;
    setAddFiled(arr);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleApplyFilter();
    }
  };

  // eslint-disable-next-line consistent-return
  const renderCloseIcon = (filter) => {
    if (
      filter.type === 'text' ||
      filter.type === 'number' ||
      filter.type === 'select'
    ) {
      return (
        <div className="fliter-input-close">
          <img
            onClick={() => {
              filterChangeHandler(filter.name, '');
              removeField(index);
            }}
            alt="forget-password"
            src={CloseIconRed}
          />
        </div>
      );
    } else if (filter.type === 'multiSelect') {
      return (
        <div className="fliter-input-close">
          <img
            onClick={() => {
              filterChangeHandler(filter.name, []);
              removeField(index);
            }}
            alt="forget-password"
            src={CloseIconRed}
          />
        </div>
      );
    } else if (filter.type === 'dateRange') {
      const initialDate = {
        endDate: moment(),
        startDate: moment().subtract(29, 'days'),
      };

      return (
        <div className="fliter-input-close">
          <img
            onClick={() => {
              filterChangeHandler(filter.name, initialDate);
              removeField(index);
            }}
            alt="forget-password"
            src={CloseIconRed}
          />
        </div>
      );
    }
  };

  return (
    <div className="filter-form">
      <div className="filter-select-value">
        <label className="filter-input-title">Select field</label>
        <Form.Control
          as="select"
          onChange={selectFilter}
          value={selectedFilter}
        >
          {filterOptions.map((filter, key) => (
            <option key={key} value={filter.name}>
              {filter.name}
            </option>
          ))}
        </Form.Control>
        <div className="downarrow-img">
          <img alt="forget-password" src={ArrowIconDownGray} />
        </div>
      </div>

      {filterOptions.map((filter, key) => (
        <Fragment key={key}>
          {selectedFilter === filter.name && (
            <Fragment>
              <div
                className={`fliter-input-value ${
                  filter.type === 'multiSelect' && 'filter-multi-select'
                }`}
              >
                <label className="filter-input-title">{filter.name}</label>
                {filter.type === 'text' && (
                  <Form.Control
                    type="text"
                    placeholder={filter.placeholder}
                    value={getFilterState(filter.name)}
                    onChange={(e) =>
                      filterChangeHandler(filter.name, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    maxLength={32}
                  />
                )}
                {filter.type === 'number' && (
                  <Form.Control
                    type="number"
                    placeholder={filter.placeholder}
                    value={getFilterState(filter.name)}
                    onChange={(e) =>
                      filterChangeHandler(filter.name, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                  />
                )}
                {filter.type === 'select' && (
                  <Form.Control
                    as="select"
                    defaultValue="select"
                    onChange={(e) =>
                      filterChangeHandler(filter.name, e.target.value)
                    }
                    value={getFilterState(filter.name)}
                  >
                    <option>select</option>
                    {filter.options.map((option, id) => (
                      <option key={id}>{option.name}</option>
                    ))}
                  </Form.Control>
                )}
                {filter.type === 'multiSelect' && (
                  <Fragment>
                    <MultiSelect
                      options={filter.options}
                      selected={getFilterState(filter.name)}
                      onSelectedChanged={(selectedValues) =>
                        filterChangeHandler(filter.name, selectedValues)
                      }
                      disableSearch={true}
                      overrideStrings={{
                        selectAll: 'All',
                        selectSomeItems: 'Select',
                      }}
                    />
                    <div className="down-arrow-img">
                      <img alt="forget-password" src={ArrowIconDownGray} />
                    </div>
                  </Fragment>
                )}
                {filter.type === 'dateRange' && (
                  <DateRangePicker
                    startDate={getFilterState(filter.name)[0]}
                    endDate={getFilterState(filter.name)[1]}
                    onApply={(event, picker) =>
                      filterChangeHandler(filter.name, picker)
                    }
                    locale={{ format: 'DD/MMM/YYYY' }}
                  >
                    <Form.Control
                      type="text"
                      value={`${getFilterState(filter.name)[0].format(
                        'DD-MMM-YYYY'
                      )} - ${getFilterState(filter.name)[1].format(
                        'DD-MMM-YYYY'
                      )}`}
                      readOnly
                    />
                    <div className="down-arrow-img">
                      <img alt="forget-password" src={ArrowIconDownGray} />
                    </div>
                  </DateRangePicker>
                )}
              </div>
              {renderCloseIcon(filter)}
            </Fragment>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AddFields;
