import React, { useState } from "react";
import styles from "./InfoModal.module.css";

export default function InfoModal({ children, label, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Tekst/Link wyzwalający popup */}
      <span className={styles.trigger} onClick={toggleModal}>
        {label}
      </span>

      {/* Struktura Modala */}
      {isOpen && (
        <div className={styles.overlay} onClick={toggleModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <h3>{title || "Informacja"}</h3>
              <button className={styles.closeBtn} onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
