import React, { useState } from "react";

const questions = [
  {
    q: "Co należy zrobić w pierwszej kolejności przy udzielaniu pierwszej pomocy?",
    options: ["Natychmiast rozpocząć uciski klatki piersiowej", "Zabezpieczyć własne bezpieczeństwo", "Zadzwonić do przełożonego"],
    answer: 1,
    explanation: "Najpierw oceń zagrożenie (prąd, ogień, toksyny), aby nie narażać własnego życia.",
  },
  {
    q: "Jaki jest numer alarmowy dla wewnętrznej służby ratunkowej?",
    options: ["911", "112", "[WPISZ NUMER WEWNĘTRZNY]"],
    answer: 2,
    explanation: "Po wezwaniu 112 należy podać wewnętrzny numer alarmowy firmy.",
  },
  {
    q: "Gdzie znajduje się apteczka B?",
    options: ["Przy wejściu na halę", "Przy stanowisku kontroli jakości (hala 2)", "Magazyn części"],
    answer: 1,
    explanation: "Apteczka B znajduje się przy stanowisku kontroli jakości w hali 2.",
  },
  {
    q: "Gdzie znajdują się defibrylatory AED w zakładzie?",
    options: ["Przy wejściu na halę i w biurze", "Magazyn główny i korytarz przy biurze", "Hala 2 i magazyn części"],
    answer: 1,
    explanation: "AED są dostępne w magazynie głównym i w korytarzu przy biurze.",
  },
  {
    q: "Ile ucisków klatki piersiowej należy wykonać w cyklu CPR?",
    options: ["15", "30", "50"],
    answer: 1,
    explanation: "Standardowy cykl to 30 ucisków i 2 oddechy ratownicze.",
  },
  {
    q: "Co należy zrobić, jeśli krew przesiąka przez opatrunek?",
    options: ["Zdjąć opatrunek i nałożyć nowy", "Dodać kolejny opatrunek i kontynuować ucisk", "Odczekać aż krwawienie samo ustanie"],
    answer: 1,
    explanation: "Nie zdejmuj opatrunku; dodaj następny i kontynuuj ucisk.",
  },
  {
    q: "Jeśli osoba dławi się i nie może oddychać, co robisz?",
    options: ["Zachęcasz do kaszlu", "Wykonujesz uderzenia między łopatki i manewr Heimlicha", "Czekasz, aż przedmioty wypadną same"],
    answer: 1,
    explanation: "Jeśli osoba nie może oddychać, wykonaj 5 uderzeń między łopatki i 5 uciśnięć nadbrzusza, powtarzając w razie potrzeby.",
  },
  {
    q: "Jak należy postępować przy oparzeniu termicznym?",
    options: ["Chłodzić zimną wodą 10–20 minut, przykryć opatrunkiem jałowym", "Nakładać lód bezpośrednio na ranę", "Natychmiast podać środki przeciwbólowe doustnie"],
    answer: 0,
    explanation: "Należy chłodzić wodą 20°C+, nie używać lodu, przykryć opatrunkiem.",
  },
  {
    q: "Ile minut należy spłukiwać oczy lub skórę w przypadku kontaktu z substancją chemiczną?",
    options: ["5 minut", "10–15 minut", "20–30 minut"],
    answer: 2,
    explanation: "Obficie płucz wodą 20–30 minut, aby zneutralizować chemikalia.",
  },
  {
    q: "Jaką pozycję przyjmujemy w przypadku wstrząsu u poszkodowanego (bez urazu kręgosłupa)?",
    options: ["Siedzącą", "Leżącą, nogi uniesione", "Na brzuchu"],
    answer: 1,
    explanation: "Pozycja leżąca z uniesionymi nogami poprawia ukrwienie narządów.",
  },
];

export default function QuizPierwszaPomoc() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'

  const handleClick = (i) => {
    if (selected !== null) return; // blokuj kliknięcia podczas oczekiwania

    setSelected(i);
    if (i === questions[current].answer) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 4000);
  };

  if (finished)
    return (
      <p>
        <strong>
          Twój wynik: {score}/{questions.length}
        </strong>
      </p>
    );

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", maxWidth: "600px" }}>
      <p>
        <strong>Pytanie {current + 1}:</strong> {questions[current].q}
      </p>
      {questions[current].options.map((opt, idx) => {
        let bgColor = "#f0f0f0";
        if (selected !== null) {
          if (idx === selected) {
            bgColor = feedback === "correct" ? "#a0e6a0" : "#f48c8c";
          }
          if (feedback === "wrong" && idx === questions[current].answer) {
            bgColor = "#a0e6a0";
          }
        }

        return (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              display: "block",
              margin: "0.5rem 0",
              padding: "0.5rem 1rem",
              cursor: selected !== null ? "default" : "pointer",
              borderRadius: "4px",
              border: "1px solid #888",
              backgroundColor: bgColor,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {opt}
          </button>
        );
      })}
      {/* Wyświetlenie uzasadnienia po błędnej odpowiedzi */}
      {feedback === "wrong" && selected !== null && <p style={{ marginTop: "0.5rem", fontStyle: "italic", color: "#fff" }}>{questions[current].explanation}</p>}
    </div>
  );
}
