import React, { useState } from "react";
import { Bracket } from "react-brackets";

const TournamentBrackets = () => {
  const [players, setPlayers] = useState([]);
  const [inputPlayer, setInputPlayer] = useState("");
  const [bracketData, setBracketData] = useState([]);

  // Agregar jugador a la lista
  const handleAddPlayer = () => {
    if (inputPlayer.trim() !== "") {
      setPlayers([...players, inputPlayer.trim()]);
      setInputPlayer("");
    }
  };

  // Generar llaves automáticamente
  const handleGenerateBrackets = () => {
    if (players.length < 2) {
      alert("Se necesitan al menos 2 jugadores para generar las llaves.");
      return;
    }

    // Generar parejas automáticas
    const pairs = [];
    for (let i = 0; i < players.length; i += 2) {
      const team1 = players[i] || "Jugador Desconocido";
      const team2 = players[i + 1] || "Jugador Desconocido";
      pairs.push({
        id: i / 2,
        teams: [{ name: team1 }, { name: team2 }],
        winner: null,
      });
    }

    // Asignar las llaves a la ronda
    setBracketData([{ roundTitle: "Primera Ronda", seeds: pairs }]);
  };

  return (
    <div>
      <h2>Generar Llaves del Torneo</h2>
      <input
        type="text"
        placeholder="Nombre del jugador"
        value={inputPlayer}
        onChange={(e) => setInputPlayer(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Agregar Jugador</button>

      <div>
        <h3>Jugadores Registrados:</h3>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleGenerateBrackets}>Generar Llaves</button>

      {bracketData.length > 0 && (
        <div>
          <h3>Llaves del Torneo</h3>
          <Bracket rounds={bracketData} />
        </div>
      )}
    </div>
  );
};

export default TournamentBrackets;


