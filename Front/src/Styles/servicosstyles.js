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

  .servicosForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    border-radius: 10px;

    .titulo {
      padding-bottom: 3rem;
    }

  }

  .inputRow {
    display: flex;
    gap: 4rem;
    width: 100%;
  }

  .inputRow > div {
    flex: 1;
  }

  .formButtonContainer {
    display: flex;
    flex-direction: column;
  
    align-items: center;
    margin-top: 2rem;
  }



`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;