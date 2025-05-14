import React from "react";
import styles from "@/styles/loading.module.scss";

export default function LoadingScreen({ message }: { message?: string }) {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingIcon}>
        <div className={styles.lds_spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.loadingText}>
        {/* <p>Loading...</p> */}
        <p>{message || `Fetching data...`}</p>
      </div>
    </div>
  );
}
