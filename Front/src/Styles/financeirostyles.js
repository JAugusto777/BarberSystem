
import styled from "styled-components";

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  body, html{ 
  width: 100%;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  }
  `

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  heigth: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  font-family: Poppins;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem 2rem 2.5rem 2rem;
  justify-content: space-between;
  background-color: #000000;
`;

export const HeaderNavButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 3rem;
`;

export const GraphToggleButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  background-color: #272727;
  border-radius: 2rem;
  padding: 1rem;
`;

export const MetricasContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1.5rem;
  
  h1{
    color: #c1ff72;
  }

  .metricas {
    display: flex;
    flex-direction: row; /* Ajuste de direção */
    padding-left: 1rem;
    gap: 1.5rem; /* Gap entre os elementos */
  }
`

export const MonthLabel = styled.div`
  font-size: 0.8rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  
  
`
export const YearLabel = styled.div`
  display: flex;
  font-size: 0.8rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`

export const DayLabel = styled.div`
  display: flex;
  font-size: 0.8rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`

export const Grafico = styled.div`
  width: 60%;
  height: 100%; 
  margin: 0 auto;

`


