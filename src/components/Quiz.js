import React, { useState } from "react";

export default function Quiz({ questions }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [fade, setFade] = useState(true);

  const handleClick = (i) => {
    if (selected !== null) return;

    setSelected(i);
    if (i === questions[current].answer) {
      setFeedback("correct");
      setScore(score + 1);

      setTimeout(() => {
        nextQuestionWithFade();
      }, 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const nextQuestionWithFade = () => {
    setFade(false);
    setTimeout(() => {
      goToNext();
      setFade(true);
    }, 300);
  };

  const goToNext = () => {
    setSelected(null);
    setFeedback(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished)
    return (
      <div style={{ textAlign: "center" }}>
        <strong>
          Twój wynik: {score}/{questions.length}
        </strong>
      </div>
    );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "0 auto", // wyśrodkowanie
        textAlign: "center", // wyśrodkowanie treści
      }}
    >
      <div
        style={{
          transition: "opacity 0.3s ease",
          opacity: fade ? 1 : 0,
        }}
      >
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
                margin: "0.5rem auto", // wyśrodkowanie przycisków
                padding: "0.5rem 1rem",
                cursor: selected !== null && feedback === "correct" ? "default" : "pointer",
                borderRadius: "4px",
                border: "1px solid #888",
                backgroundColor: bgColor,
                color: "#000",
                fontWeight: "bold",
                minWidth: "200px", // opcjonalnie, żeby przyciski miały tę samą szerokość
              }}
            >
              {opt}
            </button>
          );
        })}

        {feedback === "wrong" && selected !== null && (
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ fontStyle: "italic", color: "#fff" }}>{questions[current].explanation}</p>
            <button
              onClick={nextQuestionWithFade}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "1px solid #888",
                backgroundColor: "#888",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Dalej
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
