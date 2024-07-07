import styles from './Section.module.css';
import Card from './Card/Card';
import Title from './Title/Title';

const colors = {
  'FRONT END': '#6BD1FF',
  'BACK END': '#00C86F',
  'INNOVACIÓN Y GESTIÓN': '#FFBA05',
};

const Section = ({ title, videos, onDelete, onSave }) => {
  const backgroundColor = colors[title];  
  const borderColor = colors[title];

  return (
    <div className={styles.section}>
      <Title $backgroundColor={backgroundColor}>{title}</Title>
      <div className={styles.cardsContainer}>
        {videos.map((video) => (
          <Card key={video.link} video={video} onDelete={onDelete} onSave={onSave}  $borderColor={borderColor}/>
        ))}
      </div>
    </div>
  );
};

export default Section;