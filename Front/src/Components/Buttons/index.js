import React from "react";
import  { StyledFinanceIcon, StyledReturnIcon, StyledScheduleIcon, StyledServicesIcon, StyledTeamIcon, StyledToggleButton } from "./style";


const iconMap = {
  schedule: <StyledScheduleIcon />,
  finance: <StyledFinanceIcon />,
  team: <StyledTeamIcon />,
  services: <StyledServicesIcon />,
  return: <StyledReturnIcon/>,
  toggle: < StyledToggleButton/>
};

const Button = ({ Label, iconType, Container, onClick}) => {
  const ContainerComponent = Container || `div`;
  return (
    
    <ContainerComponent >
      {iconMap[iconType]}
      {Label}
    </ContainerComponent>
  );
};

export default Button;