import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 12rem;
  height: 2rem;
  border-radius: 1rem;
  color: black;

  .react-select__control {
    
    width: 100%;
    height: 100%;
    box-shadow: none;
    overflow: hidden;
    &:hover {
      border-color: #aaa;
    }
  }

  .react-select__value-container {
    height: 100%;
    padding: 0 6px;
    
  }

  .react-select__indicator {
    height: 100%;
  }

  .react-select__menu {
    margin-top: 0;
  }

  .react-select__option {
    padding: 10px;
  }

  
 ` 

export const TableToggleButton = styled.div`
  width: 170px;
  height: 40px;
  background-color: #3a3a3a;
  color : #ffffff;
  text-decoration : none;
  

  .react-select__control {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    box-shadow: none;
    overflow: hidden;

  }

  .react-select__value-container {
    height: 100%;
    padding: 0 6px;

  }

  .react-select__indicator {
    height: 100%;
  }

  .react-select__menu {
    margin-top: 0;
  }

  .react-select__option {
    padding: 10px;
  }

  .react-select__indicator-separator {
    display: none;
  }

`