import React, { useState } from 'react';
import './App.css';

function App() {
  const [colis, setColis] = useState(
    Array(8).fill({ longueur: '', largeur: '', hauteur: '', poids: '' })
  );

  const handleChange = (index, field, value) => {
    const updated = [...colis];
    updated[index] = { ...updated[index], [field]: value };
    setColis(updated);
  };

  const totalVolume = colis.reduce((vol, c) => {
    const l = parseFloat(c.longueur) || 0;
    const L = parseFloat(c.largeur) || 0;
    const h = parseFloat(c.hauteur) || 0;
    return vol + (l * L * h) / 1_000_000;
  }, 0);

  const totalPoids = colis.reduce((p, c) => p + (parseFloat(c.poids) || 0), 0);

  return (
    <div className="App">
      <h1>Calculateur de colis 📦</h1>
      <table>
        <thead>
          <tr>
            <th>Colis</th>
            <th>Long (cm)</th>
            <th>Larg (cm)</th>
            <th>Haut (cm)</th>
            <th>Poids (kg)</th>
          </tr>
        </thead>
        <tbody>
          {colis.map((c, i) => (
            <tr key={i}>
              <td>Colis {i + 1}</td>
              <td><input value={c.longueur} onChange={(e) => handleChange(i, 'longueur', e.target.value)} /></td>
              <td><input value={c.largeur} onChange={(e) => handleChange(i, 'largeur', e.target.value)} /></td>
              <td><input value={c.hauteur} onChange={(e) => handleChange(i, 'hauteur', e.target.value)} /></td>
              <td><input value={c.poids} onChange={(e) => handleChange(i, 'poids', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="result">
        <div className="volume">Volume total : {totalVolume.toFixed(3)} m³</div>
        <div className="poids">Poids total : {totalPoids.toFixed(2)} kg</div>
      </div>

    </div>
  );
}

export default App;
