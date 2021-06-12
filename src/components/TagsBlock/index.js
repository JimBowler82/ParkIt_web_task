import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDataContext } from "../../context/dataContext";

function TagsBlock({ tags, setData }) {
  const { photoData, setPhotoData } = useDataContext();
  const [click, setClick] = useState(false);
  let url;

  function handleClick(tag) {
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ee7b6802314ea1b40339f127d3b60210&text=${tag}&per_page=12&sort=relevance&format=json&nojsoncallback=1`;
    fetchData(tag);
  }

  const fetchData = async (tag) => {
    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);
      setPhotoData({
        type: "tag",
        payload: {
          topic: tag,
          data,
        },
      });
      //setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Tags block rendered");
  });

  return (
    <div>
      {tags.tag.map((tag, key) => {
        return (
          <span
            key={key}
            className={styles.spanTag}
            onClick={() => handleClick(tag.raw)}
          >
            {tag.raw}
          </span>
        );
      })}
    </div>
  );
}

export default TagsBlock;
