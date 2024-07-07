import { useEffect, useState } from "react";
import Banner from "../../componentes/Banner/Banner";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import Section from "../../componentes/Section/Section";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/videos');
        if (response.status === 200) {
          setVideos(response.data);
        } else {
          console.error("Failed to load videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/videos/${id}`);
      if (response.status === 200) {
        setVideos(videos.filter(video => video.id !== id));
        console.log('Video eliminado:', id);
      } else {
        console.error("Error al eliminar el video");
      }
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    }
  };

  
  const handleSave = (updatedVideo) => {
    setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
    console.log('Video actualizado:', updatedVideo);
  };

  const categories = ["FRONT END", "BACK END", "INNOVACIÓN Y GESTIÓN"];
  const categorizedVideos = categories.map(category => ({
    category,
    videos: videos.filter(video => video.category === category)
  }));

  return (
    <>
      <Header />
      <Banner />
      {categorizedVideos.map(({ category, videos }) => (
        <Section
          key={category}
          title={category}
          videos={videos}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      ))}
      <Footer />
    </>
  );
};

export default Home;
