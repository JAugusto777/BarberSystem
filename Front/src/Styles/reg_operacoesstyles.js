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
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 9rem 2rem 3rem;
  background-color: #000000;
`   

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 500px;
    padding: 2rem;
    border-radius: 30px;
    background-color: #272727;
    color: #ffffff;

    .Reg_operacoesForm{ 
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
    justify-items: center;
    align-items: center;
    height: 500px;
    gap: 4rem;
    padding: 2rem;
    border-radius: 30px;
    background-color: #272727;
    color: #ffffff;
    }
`


export const InputContainer = styled.div`
    display: flex;
    flex-direction: column
`