import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import PhotoCard from "./components/PhotoCard";
import useGetData from "./hooks/useGetData";
import { useDataContext } from "./context/dataContext";
import { Alert } from "@chakra-ui/react";
import { AlertIcon } from "@chakra-ui/react";

function App() {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  //const [url, setUrl] = useState("");
  const [query, setQuery] = useState("bears");
  const { photoData, setPhotoData } = useDataContext();
  const [pageNumber, setPageNumber] = useState(1);

  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=${query}&per_page=20&page=${pageNumber}&sort=relevance&format=json&nojsoncallback=1`;

  const { hasMore, loading, error } = useGetData(url, pageNumber);

  const observer = useRef();
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevNumber) => prevNumber + 1);
          }
        },
        {
          root: null,
          rootMargin: "-20px",
          threshold: 1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(query) {
    setQuery(query);
    setPageNumber(1);
  }

  useEffect(() => {
    handleSearch("bears");
  }, []);

  return (
    <main className={styles.container}>
      <Header />

      {loading && pageNumber === 1 && <Loading />}

      {photoData.data && (
        <section className={styles.content}>
          {photoData.data.map((item, index) => {
            if (photoData.data.length === index + 1) {
              return (
                <PhotoCard key={item.id} item={item} refProp={lastPhotoRef} />
              );
            }
            return <PhotoCard key={item.id} item={item} />;
          })}
          {loading && pageNumber > 2 && <Loading />}
        </section>
      )}

      {!photoData.data && <h1>No Photos Available!</h1>}

      {error && (
        <div className={styles.error}>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </div>
      )}
    </main>
  );
}

export default App;
