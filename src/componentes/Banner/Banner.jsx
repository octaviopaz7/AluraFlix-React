import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Banner.module.css'; 

const colors = {
  'FRONT END': '#6BD1FF',
  'BACK END': '#00C86F',
  'INNOVACIÓN Y GESTIÓN': '#FFBA05',
};

const Banner = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/videos');
        const videos = response.data;
        if (Array.isArray(videos) && videos.length > 0) {
          const firstVideo = videos[0];
          setVideo(firstVideo);
        } else {
          console.error('No videos found in the response');
        }
      } catch (error) {
        console.error('Error fetching the video data:', error);
      }
    };

    fetchVideo();
  }, [video]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const cardShadowStyle = {
    boxShadow: `0px 0px 17px 4px ${colors[video.category] || '#6BD1FF'}`,
    borderColor: colors[video.category] || '#6BD1FF',
  };

  return (
    <div className={styles.bannerStyled}>
      <div className={styles.card}>
        <div className={styles.cardContentLeft}>
          <div className={`${styles.titleContainer} ${styles.cardTitle}`} style={{ backgroundColor: colors[video.category] || '#6BD1FF' }}>
            {video.category}
          </div>
          <div className={styles.cardText}>
            <h2 className={styles.h2Challenge}>Challenge React</h2>
            <p>Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</p>
          </div>
        </div>
        <div className={styles.cardContentRight} style={cardShadowStyle}>
          <a className={styles.cardImageLink} href={video.link} target="_blank" rel="noopener noreferrer">
            <img className={styles.cardImage} src={video.photo} alt={video.title} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;