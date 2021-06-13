import React, { useState } from "react";
import styles from "./index.module.css";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

function Search({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleClick(type) {
    if (type === "search") {
      handleSearch(searchTerm);
    }

    return setSearchTerm("");
  }

  return (
    <InputGroup className={styles.inputGroup}>
      <InputLeftAddon children={<Search2Icon />} />
      <Input
        type="text"
        placeholder="search here"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <InputRightAddon
        children={
          <div>
            <IconButton
              className={styles.check_icon}
              icon={<CheckIcon onClick={() => handleClick("search")} />}
            />
            <IconButton
              size="sm"
              className={styles.close_icon}
              icon={<CloseIcon onClick={() => handleClick("clear")} />}
            />
          </div>
        }
      />
    </InputGroup>
  );
}

export default Search;
