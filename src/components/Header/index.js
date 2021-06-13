import React from "react";
import styles from "./index.module.css";
import { useDataContext } from "../../context/dataContext";
import Search from "../Search";

function Header({ handleSearch }) {
  const { photoData } = useDataContext();
  return (
    <header className={styles.header}>
      <div className={styles.headings}>
        <h1>Flickr Photo Stream</h1>
        <h2>
          Showing <em>{photoData.topic}</em> pictures{" "}
          <small>({photoData.data.length})</small>
        </h2>
      </div>
      <div className={styles.search}>
        <Search handleSearch={handleSearch} />
      </div>
    </header>
  );
}

export default Header;
