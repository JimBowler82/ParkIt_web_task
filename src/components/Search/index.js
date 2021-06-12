import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import {
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useDataContext } from "../../context/dataContext";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const { photoData, setPhotoData } = useDataContext();
  let url;

  function handleClick(type) {
    if (type === "search") {
      url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=${searchTerm}&per_page=12&sort=relevance&format=json&nojsoncallback=1`;
      fetchData();
    }

    return setSearchTerm("");
  }

  const fetchData = async () => {
    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);
      setPhotoData({
        type: "tag",
        payload: {
          topic: searchTerm,
          data,
        },
      });
      //setData(data);
    } catch (error) {
      console.error(error);
    }
  };

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
