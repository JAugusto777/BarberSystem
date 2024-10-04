// Icon.js
import styled from 'styled-components';

const StyledIcon = styled.div`
  width: 24px;  // largura do ícone
  height: 24px; // altura do ícone
  fill: #ffffff; // cor do ícone
  margin-right: 8px; // espaço entre ícone e texto

  /* Adicione outros estilos que deseja aplicar a todos os ícones */
`;

const Icon = ({ children }) => {
  return <StyledIcon>{children}</StyledIcon>;
};

export default Icon;