import React from "react";
import styles from "./index.module.css";

function TagsBlock({ tags, handleSearch }) {
  function handleClick(tag) {
    handleSearch(tag);
  }

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
