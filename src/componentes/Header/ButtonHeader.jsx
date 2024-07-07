import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ButtonStyled = styled.button`
  background: ${props => props.selected ? " #000000E5" : "transparent"};
  box-shadow: ${(props) => (props.selected ? "0px 0px 6px 4px #2271D1 inset" : "none")};
  padding: 10px 20px;
  margin-left: 0.5vw;
  margin-right: 1vw;
  border: 2px solid ${props => props.selected ? "#2271D1" : "#F5F5F5"};
  border-radius: 10px;
  color: ${props => props.selected ? "#2271D1" : " #F5F5F5"};
  font-weight: bold;
  font-size: 1.8vh;
  width: 10vw;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.selected ? "#1a5bb3" : "#2271D1"};
    color: white;
  }

   /* Media query para tablets */
   @media (max-width: 1280px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vh;
    width: 12vw;
    height: 5vh;  
  }

   @media (max-width: 1024px) {
    font-size: 1.5vh;
    width: 20vw;
    height: 3vh;  

    @media (max-height: 600px) {
      font-size: 2.5vh;
      width: 14vw;
      height: 8vh;  
    }
  }
`;


const Button = ({ children, selected, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to)
  }
  return (
    <ButtonStyled selected={selected} onClick={handleClick}>
      {children}
    </ButtonStyled>
  );
}

export default Button;