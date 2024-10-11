import { styled } from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html, body{
  width: 100%;
  height: 100%;
  padding: 0px;
  border: 0px;
  margin: 0px;
  }
  
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: ;
    background-color: #000000;
    font-family: Poppins;
  
`;

export const Header = styled.div`
 display: flex;
 width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 2rem;
  background-color: #000000;
`;
export const Content = styled.div`
    display: flex;
    gap: 10%;
    justify-content: flex-start;
    border-radius: 30px;
    width: 90%;
    height: auto;
    padding: 2rem 1rem 2rem 1rem;
    background-color: #272727;
`;


export const TableContainer = styled.div`
  display: flex;
  color: #ffffff;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  font-family: Poppins;
  

    table {
    border-collapse: collapse;
    }
  th {
  position: sticky;
  top: 0;
  background-color: #272727;
  }
  
  th, td {
    border-right: 1px solid #ffffff; 
    border-bottom: 1px solid #ffffff;
    padding: 1rem 2.5rem 1rem 2.5rem;
    text-align: center; 
  }

   td:last-child,
  th:last-child {
    border-right: none;
  }

`;

export const MetricasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: #ffffff;
  margin-left: 2%;
  max-width: 30%;
  font-family: Poppins;
  padding-right: 5%;
  border-right: 1px solid #ffffff;
  
`;

export const InputContainer = styled.div`

    

    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-size: ;
    }
`
