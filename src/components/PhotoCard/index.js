import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import TagsBlock from "../TagsBlock";
import { Spinner } from "@chakra-ui/react";

function PhotoCard({ item, setData }) {
  const [photoData, setPhotoData] = useState({});

  const fetchData = async () => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=ee7b6802314ea1b40339f127d3b60210&photo_id=${item.id}&format=json&nojsoncallback=1`;

    try {
      const response = await fetch(url);

      const data = await response.json();

      setPhotoData(data.photo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [item]);

  return (
    <>
      {!photoData.id && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      {photoData.id && (
        <article className={styles.photocard}>
          <img
            src={`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_w.jpg`}
            alt={item.author_id}
          />
          <div className={styles.photoDetails}>
            <h3>
              <a
                href={`https://www.flickr.com/photos/${photoData.owner.nsid}/${photoData.id}`}
              >
                {photoData.title._content}
              </a>{" "}
              by{" "}
              <a href={`https://www.flickr.com/people/${photoData.owner.nsid}`}>
                {photoData.owner.username}
              </a>
            </h3>
            <h4>Description:</h4>
            <p>{photoData.description._content || "No description provided"}</p>
            <div>
              <h4>Tags:</h4>
              <TagsBlock tags={photoData.tags} setData={setData} />
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default PhotoCard;
