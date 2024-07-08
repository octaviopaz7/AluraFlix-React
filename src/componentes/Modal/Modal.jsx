import { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../api/api';

const Modal = ({ show, onClose, onSave, videoData }) => {
  const [video, setVideo] = useState(videoData);
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo({
      ...video,
      [name]: value
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!video.title) newErrors.title = 'El título es obligatorio';
    if (!video.category) newErrors.category = 'La categoría es obligatoria';
    if (!video.photo) newErrors.photo = 'El enlace de la imagen es obligatorio';
    else if (!/\.(jpg|jpeg|png|gif)$/i.test(video.photo)) newErrors.photo = 'El enlace de la imagen debe tener un formato válido (jpg, jpeg, png, gif)';
    if (!video.link) newErrors.link = 'El enlace del video es obligatorio';
    else if (!/^https?:\/\/.+\..+/.test(video.link)) newErrors.link = 'El enlace del video debe ser un enlace válido';
    if (!video.description) newErrors.description = 'La descripción es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    try {
      const response = await api.put(`/videos/${video.id}`, video);
      if (response.status === 200) {
        onSave(response.data);
        onClose();
      } else {
        console.error('Error al guardar el video');
      }
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };

  const handleClear = () => {
    setVideo({
      title: '',
      category: '',
      photo: '',
      link: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className={`${styles.modalContainer} ${show ? styles.show : ''}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <img className={styles.closeButton} src="/img/cross.png" alt="Cerrar Modal" onClick={onClose} />
        </div>
        <div className={styles.tituloContainer}>
          <h2 className={styles.tituloStyled}>EDITAR CARD:</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Título</label>
          <input
            className={`${styles.input} ${errors.title ? styles.error : ''}`}
            type="text"
            name="title"
            value={video.title}
            onChange={handleChange}
            placeholder={errors.title ? errors.title : 'Ingrese el título'}
          />
          <label className={styles.label}>Categoría</label>
          <select
            className={`${styles.select} ${errors.category ? styles.error : ''}`}
            name="category"
            value={video.category}
            onChange={handleChange}
          >
            <option value="">{errors.category ? errors.category : 'Seleccione una categoría'}</option>
            <option value="FRONT END">Front End</option>
            <option value="BACK END">Back End</option>
            <option value="INNOVACIÓN Y GESTIÓN">Innovación y Gestión</option>
          </select>
          <label className={styles.label}>Imagen</label>
          <input
            className={`${styles.input} ${errors.photo ? styles.error : ''}`}
            type="text"
            name="photo"
            value={video.photo}
            onChange={handleChange}
            placeholder={errors.photo ? errors.photo : 'Ingrese el enlace de la imagen'}
          />
          <label className={styles.label}>Video</label>
          <input
            className={`${styles.input} ${errors.link ? styles.error : ''}`}
            type="text"
            name="link"
            value={video.link}
            onChange={handleChange}
            placeholder={errors.link ? errors.link : 'Ingrese el enlace del video'}
          />
          <label className={styles.label}>Descripción</label>
          <textarea
            className={`${styles.textArea} ${errors.description ? styles.error : ''}`}
            type="text"
            name="description"
            value={video.description}
            onChange={handleChange}
            placeholder={errors.description ? errors.description : 'Descripción'}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btnSave} type="submit">Guardar</button>
            <button className={styles.btnClean} type="button" onClick={handleClear}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
