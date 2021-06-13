import React from "react";
import styles from "./index.module.css";
import { Button } from "@chakra-ui/react";

function RecommendedQueries({ handleSearch }) {
  const data = ["food", "aviation", "skylines", "landscapes"];
  return (
    <div className={styles.container}>
      <small>
        <em>Recommended:</em>
      </small>
      <div>
        {data.map((item, index) => {
          return (
            <Button
              key={index}
              size="sm"
              colorScheme="blue"
              onClick={() => handleSearch(item)}
            >
              {item}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendedQueries;
