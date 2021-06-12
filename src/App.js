import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import PhotoCard from "./components/PhotoCard";
import { useDataContext } from "./context/dataContext";
import { Spinner } from "@chakra-ui/react";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { photoData, setPhotoData } = useDataContext();

  const fetchData = async () => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=bear&per_page=12&page=2&sort=relevance&format=json&nojsoncallback=1`;

    setLoading(true);
    try {
      const response = await fetch(url);

      const data = await response.json();
      setPhotoData({
        type: "add",
        payload: { data },
      });
      //setData(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("app rendered");
  });

  return (
    <main className={styles.container}>
      <Header />
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      {!loading && (
        <section className={styles.content}>
          {photoData.data.photos.photo.map((item, key) => {
            return <PhotoCard key={key} item={item} setData={setData} />;
          })}
        </section>
      )}
    </main>
  );
}

export default App;
