import React from "react";
import Select from "react-select";


const Dropdown = ({ Container, options, multiple = false, onChange, placeholder }) => {
  const ContainerComponent = Container || `div`;
  return (
    <ContainerComponent>
      <Select options={options} isMulti={multiple}  placeholder={placeholder} onChange={onChange}/>
    </ContainerComponent>
  );
};

export default Dropdown;
