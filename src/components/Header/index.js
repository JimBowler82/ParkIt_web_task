import React from "react";
import styles from "./index.module.css";
import { useDataContext } from "../../context/dataContext";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

function Header() {
  const { photoData } = useDataContext();
  return (
    <header className={styles.header}>
      <div className={styles.headings}>
        <h1>Flickr Photo Stream</h1>
        <h2>Showing {photoData.topic} pictures </h2>
      </div>
      <div className={styles.search}>
        <InputGroup className={styles.inputGroup}>
          <InputLeftAddon children={<Search2Icon />} />
          <Input type="text" placeholder="search here" />
        </InputGroup>
      </div>
    </header>
  );
}

export default Header;
