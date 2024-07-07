import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components"

const FooterStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border: 4px 0px 0px 0px;
  background: #000000E5;
  border-top: 4px solid  #2271D1;
  box-shadow: 0px 5px 29px 0px #2271D1B2;
  margin-top: 5vh;

  @media (max-width: 430px) {
      padding: 15px;
    }

  img{
    width: 12vw;
    height: 6vh;

    /* Media query para tablets */
    @media (max-width: 1024px) {
      width: 18vw;
      height: 4vh;
      padding: 1vh 0;
    }

     /* Media query para móviles */
    @media (max-width: 430px) {
      width: 10vw;
      height: 5vh;
      padding: 0;
    }

    @media (max-height: 600px) {
      width: 14vw;
      height: 10vh;
      padding: 0;
    }
    }
`

const BtnsCotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6vw;
`

const BtnHomeCotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2271D13D;
  border: 2px solid #2271D1;
  color: #fff;
  width: 35vw;
  border: 2px 0px 0px 0px;
  border-radius: 30px;
  gap: 1vw;
`

const P = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  color: #2271D1;
  margin: 2vh 0 1.5vh 0;
`

const BtnAddCotainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 20vw;
margin-left: 5vw;
`

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);
  const location = useLocation();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 430);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <FooterStyled>
      {isMobile ? (
        <>
          <BtnsCotainer>
            <Link to="/">
            <BtnHomeCotainer>
              <img src="/img/home.png" alt="Button 1"/>
              <P>HOME</P>
            </BtnHomeCotainer>
            </Link>
            <Link to="/nuevo-video">
            <BtnAddCotainer>
              <img src="/img/NuevoVideo.png" alt="Button 2"/>
            </BtnAddCotainer>
            </Link>
          </BtnsCotainer>
        </>
      ) : (
        <img src="/img/logoAlura.png" alt="Logo de AluraFlix" />
      )}
    </FooterStyled>
  );
};

export default Footer
