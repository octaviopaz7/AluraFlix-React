import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import styles from './NuevoVideo.module.css';
import axios from 'axios';

const NuevoVideo = () => {
  const [video, setVideo] = useState({
    title: '',
    category: '',
    photo: '',
    link: '',
    description: ''
  });

  const [nextId, setNextId] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/videos');
        const videos = response.data;
        const maxId = videos.reduce((max, video) => Math.max(max, parseInt(video.id, 10)), 0);
        setNextId((maxId + 1).toString());
      } catch (error) {
        console.error('Error al traer videos:', error);
      }
    };

    fetchNextId();
  }, []);

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
      const newVideo = { ...video, id: nextId };
      const response = await axios.post('http://localhost:3000/videos', newVideo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 201) {
        console.log('Nuevo video agregado:', response.data);
        handleClear();
        navigate('/');
      } else {
        console.error('Error al agregar el nuevo video');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>NUEVO VIDEO</h1>
        <h2 className={styles.subTitle}>Complete el formulario para crear una nueva tarjeta de video</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.h3Container}>
          <h3 className={styles.titleH3}>Crear Tarjeta</h3>
          </div>
          <div className={styles.containter2inpLbl}>
            <div className={styles.containerInpYLbl}>
              <label className={styles.label}>Título</label>
              <input
                className={`${styles.input} ${errors.title ? styles.error : ''}`}
                type="text"
                name="title"
                value={video.title}
                onChange={handleChange}
                placeholder={errors.title ? errors.title : 'Ingrese el título'}
              />
            </div>
            <div className={styles.containerInpYLbl}>
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
            </div>
          </div>
          <div className={styles.containter2inpLbl}>
            <div className={styles.containerInpYLbl}>
              <label className={styles.label}>Imagen</label>
              <input
                className={`${styles.input} ${errors.photo ? styles.error : ''}`}
                type="text"
                name="photo"
                value={video.photo}
                onChange={handleChange}
                placeholder={errors.photo ? errors.photo : 'Ingrese el enlace de la imagen'}
              />
            </div>
            <div className={styles.containerInpYLbl}>
              <label className={styles.label}>Video</label>
              <input
                className={`${styles.input} ${errors.link ? styles.error : ''}`}
                type="text"
                name="link"
                value={video.link}
                onChange={handleChange}
                placeholder={errors.link ? errors.link : 'Ingrese el enlace del video'}
              />
            </div>
          </div>
          <label className={styles.label}>Descripción</label>
          <textarea
            className={`${styles.textArea} ${errors.description ? styles.error : ''}`}
            name="description"
            value={video.description}
            onChange={handleChange}
            placeholder={errors.description ? errors.description : '¿De qué se trata este video?'}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btnSave} type="submit">Guardar</button>
            <button className={styles.btnClean} type="button" onClick={handleClear}>Limpiar</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default NuevoVideo;
