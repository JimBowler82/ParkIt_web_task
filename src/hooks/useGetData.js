import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";
import { scrollAction, newQueryAction } from "../context/actions";

export default function useGetData(url, pageNumber, query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { setPhotoData } = useDataContext();

  async function getData() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(url);
      const results = await response.json();

      if (pageNumber === 1) {
        setPhotoData(newQueryAction(query, results));
      } else {
        setPhotoData(scrollAction(results));
      }

      setHasMore(results.photos.page < results.photos.pages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, [url, pageNumber]);

  return { loading, error, hasMore };
}
