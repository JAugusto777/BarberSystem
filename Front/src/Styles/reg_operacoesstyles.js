import styled from "styled-components";

export const Container = styled.div`
  body{
    height: 100vh;
    margin: 0px;
    width: 100vw;
    padding: 0px;
    margin:0px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #000000;
  font-family: Poppins;

  .containermain {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  }

`

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem 1rem 2rem;
  background-color: #000000;
  
`   

export const Content = styled.div`
    display: flex;
    gap: 3rem;
    height: 25rem;

    .Reg_operacoesForm{ 
    padding: 1rem 3rem 1rem 3rem;
    height: 26rem;
    width: 100%;
    display: grid;
    grid-template-columns: 18rem 18rem;
    grid-template-rows: 6rem 6rem 6rem 6rem;
    background-color: #272727;
    border-radius: 1rem;
    color: #ffffff;
    }

    .historico {
    
    display: flex;
    align-items: center;
    gap:1rem;
    flex-direction: column;
    background-color: #272727;
    width: auto;
    height: 26rem;
    border-radius: 1rem;
    padding: 2rem;

      h2 {
      font-size: 2rem; 
      white-space: nowrap;
      
      }
    }
`


export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 1.5rem;
    }
    

`