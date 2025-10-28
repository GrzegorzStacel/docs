import React, { useState } from "react";

export default function QuizPozar() {
  const questions = [
    {
      q: "Co robisz w pierwszej kolejności podczas pożaru?",
      options: ["Natychmiast próbuję ugasić ogień", "Zachowuję spokój i oceniam sytuację", "Biegnę po kolegę"],
      answer: 1,
      explanation: "Bez paniki i oceny sytuacji nie da się bezpiecznie ocenić zagrożenia ani skutecznie ewakuować ludzi.",
    },
    {
      q: "Jaką gaśnicę wybierasz do urządzeń elektrycznych?",
      options: ["Pianowa", "Proszkowa ABC", "CO₂"],
      answer: 2,
      explanation: "Gaśnica CO₂ nie przewodzi prądu i jest bezpieczna do gaszenia sprzętu elektrycznego.",
    },
    {
      q: "Czy można używać windy podczas ewakuacji?",
      options: ["Tak, jeśli jest blisko wyjścia", "Nie, zawsze należy używać schodów", "Tylko w przypadku małego pożaru"],
      answer: 1,
      explanation: "Winda może się zatrzymać podczas pożaru lub wypełnić dymem — schody są zawsze bezpieczne.",
    },
    // ... (reszta pytań)
  ];

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
