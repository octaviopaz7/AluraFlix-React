import styles from './Title.module.css';

const Title = ({ $backgroundColor, children }) => {
  return (
    <div
      className={styles.container}
      style={{ '--background-color': $backgroundColor }}
    >
      <h2 className={styles.title}>{children}</h2>
    </div>
  );
};

export default Title;