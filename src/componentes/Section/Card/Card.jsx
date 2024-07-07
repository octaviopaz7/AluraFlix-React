import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Modal/Modal';


const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 42vh;
  padding: 0;
  margin: 20px 0px 10px 0px;
  border: 5px solid ${(props) => props.$borderColor};
  box-shadow: 0px 0px 12px 6px ${(props) => props.$borderColor};
  border-radius: 20px;
  box-sizing: border-box;
  margin-bottom: 2.5vh;
`;

const VideoLink = styled.a` 
  width: 100%;
  height: 80%; /* Ajusta la altura del enlace */
  display: block;
  border-radius: 15px 15px 0 0; /* Ajusta los bordes superiores */`

const VideoImage = styled.img`
  width: 100%; /* Ajusta el ancho para que ocupe todo el espacio disponible */
  height: 100%; /* Permite que la altura se ajuste automáticamente */
  border-radius: 15px 15px 0 0; /* Ajusta los bordes superiores */
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2vw;
  justify-content: center;
  background:  #000000E5;  
  width: 100%;
  height: 20%;
  border-radius: 0px 0px 15px 15px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  background: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  
  &:hover {
    background-color:  #171616da;
    ;
  }
`;

const ImgButton = styled.img`
  height: 2vh;
`

const Card = ({ video, onDelete, onSave, $borderColor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(video.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedVideo) => {
    onSave(updatedVideo);
    setIsModalOpen(false);
  };

  return (
    <>
      <CardStyled $borderColor={$borderColor}>
        <VideoLink href={video.link} target="_blank" rel="noopener noreferrer">
          <VideoImage src={video.photo} alt={video.title} />
        </VideoLink>
        <ButtonsContainer>
          <Button onClick={handleEdit}> <ImgButton src="/img/editar.png" alt="" /> Editar</Button>
          <Button onClick={handleDelete}>  <ImgButton src="/img/borrar.png" alt="" /> Borrar</Button>
        </ButtonsContainer>
      </CardStyled>
      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          videoData={video}
        />
      )}
    </>
  );
};

export default Card;
