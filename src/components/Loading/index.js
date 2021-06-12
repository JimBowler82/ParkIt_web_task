import React from "react";
import ReactDom from "react-dom";
import styles from "./index.module.css";
import { Spinner } from "@chakra-ui/react";

function Loading() {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.loading}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Loading;
