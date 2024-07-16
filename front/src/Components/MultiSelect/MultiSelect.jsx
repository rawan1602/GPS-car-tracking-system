import React, { useState } from "react";
import Select from "react-select";

const MultiSelect = ({
  data,
  onSelectionChange,
  defaultValue,
  title,
  required,
}) => {
  const defaultOption = defaultValue;
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const options = data;

  const handleChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
    onSelectionChange(selectedOptions); // Call the callback function with selected values
  };

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>{title}</h1>
      <Select
        required={required}
        value={selectedOption}
        onChange={(selectedOptions) => {
          handleChange(selectedOptions);
        }}
        options={options}
        placeholder="select" // Updated placeholder text
      />
    </div>
  );
};

export default MultiSelect;

// <NewMultiSelect
// data={ categories.data &&
//   categories.data.map((el) => ({
//     ...el,
//     label: el.ProductCategoriesNameEng,
//     value: el.ProductCategoriesId,
//   }))
// }
//       onSelectionChange={(e) => {
//          setValue("test", e)
//       }}
//       defaultValue={{ label: 'ASS test', value: '1' }}
// />
