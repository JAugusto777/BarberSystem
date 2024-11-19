import styled from "styled-components";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaScissors } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowCircleLeft } from "react-icons/fa";


export const HomeButtonContainer = styled.button`
  background-color: #272727;
  color: #ffffff;
  height: 100%;
  width: 100%;
  font-family: Poppins, sans-serif;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  border-radius: 30px;
  text-decoration: none;
 

  &:hover {
    background-color: #3a3a3a;
    transform: scale(1.1);
    transition: 0.3s ease;
    cursor: pointer;
  }

  &:active {
    background-color: #464646;
    transform: scale(1.05);
    transition: 0.1s ease;
  }
`;

export const HeaderFinanceiroButtonContainer = styled.button`
  display:flex;
  width: 170px;
  height: 40px;
  background-color: #3a3a3a;
  color: #ffffff;
  font-size: 15px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  
  .icon{
    fontsize: 5px;
  }

   &:hover {
    background-color: #3a3a3a;
    transform: scale(1.1);
    transition: 0.3s ease;
    cursor: pointer;
  }

  &:active {
    background-color: #464646;
    transform: scale(1.05);
    transition: 0.1s ease;
  }
`;

export const Reg_operacoesButtonContainer = styled.button`

display: flex;
justify-content: center;
align-items: center;
font-weight: 600;
background-color: #ffffff;
width: 10rem;
height: 3rem;
margin-top: 2rem;
margin-left: 4rem;

border-radius: 0.5rem;
color: #000000;
font-family: Poppins;

   &:hover {
    background-color: #dddddd;
    transform: scale(1.1);
    transition: 0.3s ease;
    cursor: pointer;
  }

  &:active {
    background-color: #464646;
    transform: scale(1.05);
    transition: 0.1s ease;
  }


`

export const StyledScheduleIcon = styled(AiOutlineSchedule)`
  color: #c1ff72;
  font-size: 4rem;
  
`;
export const StyledFinanceIcon = styled(FaMoneyBillTransfer)`
  color: #c1ff72;
  font-size: 4rem;
  
`;
export const StyledTeamIcon = styled(FaUsers)`
  color: #c1ff72;
  font-size: 4rem;
 
`;
export const StyledServicesIcon = styled(FaScissors)`
  color: #c1ff72;
  font-size: 4rem;
 
`;

export const StyledReturnIcon = styled(FaArrowCircleLeft)`
  color: #ffffff;
  font-size: 2.5rem;
  margin-right: 4rem;
`;

export const StyledToggleButton = styled(IoIosArrowDown)`
  color: #ffffff;
  font-size: 30px;
  
`;


