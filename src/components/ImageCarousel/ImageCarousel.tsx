import React, { useState, useEffect, useCallback } from "react";
import styles from "./ImageCarousel.module.css";

// Zaktualizowany typ danych
type ImageItem = {
  src: string;
  title: string;
  fullTitle: string;
};

type Props = {
  images: ImageItem[];
  changeContext: string;
};

export default function ImageCarousel({ images, changeContext }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return <p style={{ padding: "10px", color: "gray" }}>Brak obrazów do wyświetlenia.</p>;
  }

  const close = useCallback(() => setIndex(null), []);

  const prev = useCallback(() => {
    setIndex((i) => {
      if (i === null) return null;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (i === null) return null;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  // Obsługa klawiatury
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  const currentImage = index !== null ? images[index] : null;

  return (
    <>
      {/* 1. SEKCJA MINIATUR (GRID) */}
      <div className={styles.grid}>
        {images.map((item, i) => (
          <div key={item.src} className={styles.thumbContainer} onClick={() => setIndex(i)}>
            {/* 💡 KLUCZOWA ZMIANA: Usuwamy loading="lazy" z miniatur, aby przeglądarka 
               nie de-renderowała ich agresywnie podczas szybkiego przewijania na telefonie.
               
               Miniatury są i tak chronione przez <details>, więc ładowanie rozpocznie się
               dopiero po otwarciu sekcji. Usunięcie "lazy" wymusi ich utrzymanie 
               w pamięci renderowania po załadowaniu.
            */}
            <img
              src={item.src}
              alt={item.title}
              className={styles.thumb}
              // Usunięto loading="lazy"
            />

            {/* Krótki tytuł */}
            <div className={styles.thumbTitle}>{item.title}</div>
          </div>
        ))}
      </div>

      {/* 2. SEKCJA PEŁNOEKRANOWA (OVERLAY) */}
      {index !== null && currentImage && (
        <div className={styles.overlay} onClick={close}>
          <button
            className={styles.left}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>

          <div className={styles.fullImageContainer}>
            {/* TYTUŁ PEŁNOEKRANOWY (Używa przekazanego propa) */}
            <div className={styles.imageTitle}>
              <strong>{changeContext}</strong>
              <br />
              {currentImage.fullTitle}
            </div>

            <img src={currentImage.src} alt={currentImage.fullTitle} className={styles.full} />

            {/* Licznik (pod obrazem) */}
            <div className={styles.imageCounter}>
              {index + 1} / {images.length}
            </div>
          </div>

          <button
            className={styles.right}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
