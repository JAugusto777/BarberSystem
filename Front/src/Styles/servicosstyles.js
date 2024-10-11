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

  .containermain {
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  }
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
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 65%;
  border-radius: 30px;
  background-color: #272727;
  color: #ffffff;

  .servicosForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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
    justify-content: center;
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
