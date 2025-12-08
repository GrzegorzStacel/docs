import React, { useState } from "react";

export default function FoliaCalculator() {
  const [szerokoscCm, setSzerokoscCm] = useState(20);
  const [srednicaPelna, setSrednicaPelna] = useState(59);
  const [srednicaTuby, setSrednicaTuby] = useState(10);
  const [m2Pelne, setM2Pelne] = useState(35000);
  const [srednicaAktualna, setSrednicaAktualna] = useState(59);
  const [wynik, setWynik] = useState(null);

  const oblicz = () => {
    const szerokosc = szerokoscCm / 100; // przelicz cm na m
    const R0 = srednicaPelna / 2;
    const r = srednicaTuby / 2;
    const R1 = srednicaAktualna / 2;

    const m2Pozostale = (m2Pelne * (R1 ** 2 - r ** 2)) / (R0 ** 2 - r ** 2);
    const metryDlugosci = m2Pozostale * szerokosc;

    setWynik({
      m2Pozostale: m2Pozostale.toFixed(0),
      metryDlugosci: metryDlugosci.toFixed(0),
    });
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  };

  const labelStyle = {
    flex: "1",
    marginRight: "0.5rem",
  };

  const inputStyle = {
    flex: "1",
    padding: "0.25rem",
  };

  return (
    <div style={{ maxWidth: "500px", margin: "1rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3 style={{ textAlign: "center" }}>Kalkulator folii</h3>

      <div style={rowStyle}>
        <label style={labelStyle}>Szerokość folii (cm):</label>
        <input style={inputStyle} type="number" step="0.1" value={szerokoscCm} onChange={(e) => setSzerokoscCm(parseFloat(e.target.value))} />
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>Średnica pełnej rolki (cm):</label>
        <input style={inputStyle} type="number" value={srednicaPelna} onChange={(e) => setSrednicaPelna(parseFloat(e.target.value))} />
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>Średnica tuby (cm):</label>
        <input style={inputStyle} type="number" value={srednicaTuby} onChange={(e) => setSrednicaTuby(parseFloat(e.target.value))} />
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>Powierzchnia całej rolki (m²):</label>
        <input style={inputStyle} type="number" value={m2Pelne} onChange={(e) => setM2Pelne(parseFloat(e.target.value))} />
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>Średnica aktualnej rolki (cm):</label>
        <input style={inputStyle} type="number" value={srednicaAktualna} onChange={(e) => setSrednicaAktualna(parseFloat(e.target.value))} />
      </div>

      <button
        onClick={oblicz}
        style={{
          display: "block",
          margin: "1rem auto 0 auto",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Oblicz
      </button>

      {wynik && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            Pozostała powierzchnia: <strong>{wynik.m2Pozostale} m²</strong>
          </p>
          <p>
            Długość folii: <strong>{wynik.metryDlugosci} m</strong>
          </p>
        </div>
      )}
    </div>
  );
}
