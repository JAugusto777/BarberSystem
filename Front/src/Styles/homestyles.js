import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`

  html, body{
  width: 100%;
  height: 100%;
  padding: 0px;
  border: 0px;
  margin: 0px;
  }
`
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh; 
    align-items: center;
    gap: 5rem;
    background-color: #1c1c1c;
`;

export const Header = styled.div`

@font-face {
    font-family: 'DistilleryStrong';
    src: url('DistilleryStrong.woff2') format('woff2'),
        url('DistilleryStrong.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
    font-size: 25px;
    color: #ffffff;
    
    h1{
        font-family: 'DistilleryStrong';
    }
    h2{
        font-family: "Playwrite DK Loopet", sans-serif; /* Certifique-se que essa fonte também está carregada corretamente */
    }
`;

export const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 5rem;
    width: 100%;
    height: 18rem;

    a {
        width: 13rem;
        height: 10rem;
    }

`;

export default GlobalStyle;