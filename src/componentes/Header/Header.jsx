import styled from "styled-components"
import Button from "./ButtonHeader";
import { useLocation } from "react-router-dom";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:  #262626;
  border-bottom: 4px solid #2271D1;
  box-shadow: 0px 5px 29px 0px #2271D1B2;
  padding: 20px;
  border: 0px 0px 4px 0px;

    /* Media query para tablets */
    @media (max-width: 1024px) {
      background: #000000E5;
    }

    @media (max-width: 430px) {
    display: none;
    }
  
  img{
    width: 10vw;
    height: 5vh;

    /* Media query para tablets */
    @media (max-width: 1024px) {
    width: 16vw;
    height: 3vh;
    }

    @media (max-height: 600px) {
      width: 14vw;
      height: 8vh;  
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderStyled>
      <img src="/img/logoAlura.png" alt="Logo de AluraFlix" />
      <ButtonContainer>
        <Button selected={location.pathname === "/"} to={"/"}>HOME</Button>
        <Button selected={location.pathname === "/nuevo-video"} to={"/nuevo-video"}>NUEVO VIDEO</Button>
      </ButtonContainer>
    </HeaderStyled>
  )
}

export default Header

