import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  heigth: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  font-family: Poppins;

  .containermain {
  align-items: center;
  gap: 1rem;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    width:100%;
    padding:1rem 2rem;
    border-radius: 30px;
    background-color: #272727;
    color: #ffffff;

    .Reg_operacoesForm{ 
    padding: 0rem 6rem 0rem 6rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 1rem  6rem;
    justify-items: center;
    align-items: center;
    background-color: #272727;
    color: #ffffff;
    }
`


export const InputContainer = styled.div`
    display: flex;
    flex-direction: column
`