import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ImageCarousel.module.css";

// Ustawienia czułości gestu swipe
const SWIPE_THRESHOLD = 50; // Minimalna odległość przesunięcia (w pikselach)

// Zaktualizowany typ danych
type ImageItem = {
  src: string;
  title: string;
  fullTitle: string;
};

type Props = {
  images: ImageItem[];
  changeContext: string;
  layout?: "grid" | "center";
};

export default function ImageCarousel({ images, changeContext, layout = "grid" }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  // Ref do przechowywania początkowej pozycji dotyku
  const touchStartRef = useRef<number | null>(null);

  if (!images || images.length === 0) {
    return <p style={{ padding: "10px", color: "gray" }}>Brak obrazów do wyświetlenia.</p>;
  }

  // --- Funkcje do sterowania karuzelą (już istniejące) ---
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
  // --------------------------------------------------------

  // --- Obsługa GESTÓW SWIPE ---

  // 1. touchstart: Zapisuje początkową pozycję dotyku X
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Sprawdzamy, czy dotyk jest pojedynczy
    if (e.touches.length === 1) {
      touchStartRef.current = e.touches[0].clientX;
    } else {
      touchStartRef.current = null;
    }
  }, []);

  // 2. touchend: Oblicza przesunięcie i wywołuje prev/next
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      // Jeśli nie ma zapisanego punktu startu, wychodzimy
      if (touchStartRef.current === null) return;

      // Miejsce zakończenia dotyku
      const touchEndX = e.changedTouches[0].clientX;

      // Obliczamy różnicę (przesunięcie)
      const diff = touchStartRef.current - touchEndX;

      // Sprawdzamy, czy gest był wystarczająco długi
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
          // Przesunięcie w lewo (diff > 0) -> przejdź do następnego zdjęcia
          next();
        } else {
          // Przesunięcie w prawo (diff < 0) -> przejdź do poprzedniego zdjęcia
          prev();
        }
      }

      // Resetujemy referencję
      touchStartRef.current = null;
    },
    [prev, next]
  );

  // 3. touchmove: Zapobiega przewijaniu strony podczas przesuwania palcem w obszarze karuzeli (opcjonalne, ale zalecane)
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Zapobiegamy domyślnej akcji (np. przewijaniu strony w pionie), jeśli
    // to jest swipe horyzontalny
    if (touchStartRef.current !== null) {
      // e.preventDefault();
      // Ostrzeżenie: e.preventDefault() może zakłócić inne zachowania przeglądarki.
      // Zostawiamy zakomentowane, chyba że wystąpią problemy z przewijaniem pionowym.
    }
  }, []);

  // ----------------------------------------------------

  // Obsługa klawiatury (bez zmian)
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
      <div className={`${styles.grid} ${layout === "center" ? styles.centerLayout : ""}`}>
        {images.map((item, i) => (
          <div key={item.src} className={styles.thumbContainer} onClick={() => setIndex(i)}>
            <img src={item.src} alt={item.title} className={styles.thumb} />

            <div className={styles.thumbTitle}>{item.title}</div>
          </div>
        ))}
      </div>

      {/* 2. SEKCJA PEŁNOEKRANOWA (OVERLAY) */}
      {index !== null && currentImage && (
        <div
          className={styles.overlay}
          onClick={close}
          // Dodajemy Handlery do elementu pełnoekranowego:
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
            <div className={styles.imageTitle}>
              <strong>{changeContext}</strong>
              <br />
              {currentImage.fullTitle}
            </div>

            <img src={currentImage.src} alt={currentImage.fullTitle} className={styles.full} />

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
