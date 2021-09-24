import React from 'react';

import MultiSelect from '@khanacademy/react-multi-select';

const MultipleSelect = ({ options, selected, onMultiSelectChange }) => (
  <MultiSelect
    options={options}
    selected={selected}
    onSelectedChanged={(selectedValues) => onMultiSelectChange(selectedValues)}
    disableSearch={true}
    overrideStrings={{
      selectAll: 'All',
      selectSomeItems: 'Select',
    }}
  />
);

export default MultipleSelect;
