import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import TagsBlock from "../TagsBlock";

function PhotoCard({ item, refProp, handleSearch }) {
  const [singlePhotoData, setSinglePhotoData] = useState({});

  const fetchSinglePhotoData = async () => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${process.env.REACT_APP_API_KEY}&photo_id=${item.id}&format=json&nojsoncallback=1`;

    try {
      const response = await fetch(url);

      const data = await response.json();

      setSinglePhotoData(data.photo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSinglePhotoData();
  }, [item]);

  return (
    <>
      {singlePhotoData.id && (
        <article className={styles.photocard} ref={refProp}>
          <img
            src={`https://live.staticflickr.com/${singlePhotoData.server}/${singlePhotoData.id}_${singlePhotoData.secret}_w.jpg`}
            alt={item.author_id}
          />
          <div className={styles.photoDetails}>
            <h3>
              <a
                href={`https://www.flickr.com/photos/${singlePhotoData.owner.nsid}/${singlePhotoData.id}`}
              >
                {singlePhotoData.title._content}
              </a>{" "}
              by{" "}
              <a
                href={`https://www.flickr.com/people/${singlePhotoData.owner.nsid}`}
              >
                {singlePhotoData.owner.username}
              </a>
            </h3>
            <h4>Description:</h4>
            <p>
              {singlePhotoData.description._content ||
                "No description provided"}
            </p>
            <div className={styles.tagsDiv}>
              <h4>Tags:</h4>
              <TagsBlock
                tags={singlePhotoData.tags}
                handleSearch={handleSearch}
              />
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default PhotoCard;
