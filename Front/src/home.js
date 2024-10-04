import {
  Container,
  Header,
  Navigation,
  GlobalStyle,
} from "./Styles/homestyles";
import ButtonHome from "./Components/Buttons/index";
import { HomeButtonContainer } from "./Components/Buttons/style";
import { Link } from "react-router-dom";
import Logo from "./Img/Logo.png";

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "25rem", height: "auto" }}
          />
        </Header>
        <Navigation>
          <Link to="/" style={{textDecoration:"none"}}>
            <ButtonHome
              Label={"Agendamentos"}
              iconType={"schedule"}
              Container={HomeButtonContainer}
              to="/"
            />
          </Link>
          <Link to="/financeiro" style={{textDecoration:"none"}}>
            <ButtonHome
              Label={"Financeiro"}
              iconType={"finance"}
              Container={HomeButtonContainer}
            />
          </Link>
          <Link to="/" style={{textDecoration:"none"}}>
            <ButtonHome
              Label={"Equipe"}
              iconType={"team"}
              Container={HomeButtonContainer}
            />
          </Link>
          <Link to="/servicos" style={{textDecoration:"none"}}>
            <ButtonHome
              Label={"Serviços"}
              iconType={"services"}
              Container={HomeButtonContainer}
              to="/servicos"
            />
          </Link>
        </Navigation>
      </Container>
    </>
  );
};
export default Home;
