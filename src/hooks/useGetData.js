import React, { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";

export default function useGetData(url, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const { photoData, setPhotoData } = useDataContext();

  async function getData() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(url);
      const data = await response.json();

      setPhotoData({
        type: "add",
        payload: {
          data: data.photos.photo,
        },
      });

      setHasMore(data.photos.page < data.photos.pages);
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
