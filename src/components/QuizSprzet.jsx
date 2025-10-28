import React, { useState } from "react";

const questions = [
  {
    q: "Gdzie znajduje się gaśnica CO₂ przeznaczona do urządzeń elektrycznych?",
    options: ["Wejście główne hali", "Maszyna nr 4, środek hali", "Magazyn części"],
    answer: 1,
    explanation: "Gaśnica CO₂ w maszynie nr 4 jest bezpieczna dla urządzeń elektrycznych.",
  },
  {
    q: "Jaka gaśnica powinna być użyta do cieczy palnych w laboratorium?",
    options: ["Proszkowa ABC", "CO₂", "Pianowa"],
    answer: 2,
    explanation: "Pianowa gaśnica jest przeznaczona do cieczy palnych.",
  },
  {
    q: "Gdzie powinny znajdować się punkty zbiórki podczas ewakuacji?",
    options: ["Najbliżej wejścia głównego", "Przed halą i za biurami, zgodnie z wyznaczonymi punktami", "Na środku hali"],
    answer: 1,
    explanation: "Punkty zbiórki są wyznaczone i sprawdzane przez odpowiedzialne osoby.",
  },
  {
    q: "Co należy zrobić po uruchomieniu ręcznego ostrzegacza pożarowego (ROP)?",
    options: ["Kontynuować pracę, jeśli ogień jest mały", "Natychmiast powiadomić przełożonego i ewakuować ludzi", "Spróbować ugasić ogień samodzielnie"],
    answer: 1,
    explanation: "Alarm aktywuje system syren i migających świateł, a priorytetem jest bezpieczeństwo ludzi.",
  },
  {
    q: "Czy można używać windy podczas ewakuacji?",
    options: ["Tak, jeśli wyjścia awaryjne są zajęte", "Nie, zawsze należy korzystać ze schodów", "Tylko w magazynie"],
    answer: 1,
    explanation: "Windy mogą się zatrzymać lub wypełnić dymem, dlatego zawsze należy używać schodów.",
  },
  {
    q: "Który błąd najczęściej popełniają ludzie podczas ewakuacji?",
    options: ["Pomoc osobom niepełnosprawnym", "Panika i pędzenie do wyjścia głównego", "Zamknięcie drzwi po sobie"],
    answer: 1,
    explanation: "Panika zwiększa ryzyko wypadków i utrudnia bezpieczną ewakuację.",
  },
  {
    q: "Jak często należy sprawdzać widoczność gaśnic?",
    options: ["Raz w miesiącu", "Raz w roku", "Tylko po pożarze"],
    answer: 0,
    explanation: "Regularne kontrole zapewniają, że gaśnice są zawsze dostępne i widoczne.",
  },
  {
    q: "Kto sprawdza listę obecności po ewakuacji?",
    options: ["Straż pożarna", "Osoba odpowiedzialna w punkcie zbiórki", "Każdy pracownik indywidualnie"],
    answer: 1,
    explanation: "Koordynator w punkcie zbiórki weryfikuje obecność wszystkich osób i zgłasza brakujących straży pożarnej.",
  },
  {
    q: "Jakie dodatkowe środki należy zabrać z laboratorium podczas ewakuacji?",
    options: ["Maski i rękawice chemiczne", "Tylko telefon", "Nic, wystarczy wyjść"],
    answer: 0,
    explanation: "Maski i rękawice chronią przed chemikaliami w laboratorium podczas ewakuacji.",
  },
  {
    q: "Co jest najważniejsze podczas ewakuacji?",
    options: ["Ochrona mienia", "Bezpieczeństwo ludzi", "Wyłączenie maszyn"],
    answer: 1,
    explanation: "Priorytetem jest życie i bezpieczeństwo ludzi, nie mienie ani maszyny.",
  },
];

export default function QuizSprzet() {
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
