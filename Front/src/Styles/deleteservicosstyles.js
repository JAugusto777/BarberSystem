import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: #ffffff;
  font-family: Poppins;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 2rem 3rem;
  background-color: #000000;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 60%;
  padding: 2rem;
  border-radius: 30px;
  background-color: #272727;
  color: #ffffff;
  gap: 2rem;

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 5rem;

    .titulo {
      padding-bottom: 3rem;
    }

    .blocos {
     display: flex;
     flex-direction: column;
     align-items: center;
     padding-bottom: 4rem;
     }
  }
` 

export const InputContainer = styled.div`
  display: flex;
  gap: 10rem;
`;
