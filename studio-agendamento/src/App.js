// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

function App() {
  const [horarios, setHorarios] = useState([]);
  const [novoHorario, setNovoHorario] = useState({ dia: "", hora: "", nome: "" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/horarios");
      setHorarios(response.data);
    };
    fetchData();
  }, []);

  const handleAgendar = async () => {
    if (novoHorario.dia.trim() !== "" && novoHorario.hora.trim() !== "" && novoHorario.nome.trim() !== "") {
      await api.post("/horarios", { ...novoHorario, id: Date.now() });
      setNovoHorario({ dia: "", hora: "", nome: "" });

      const response = await api.get("/horarios");
      setHorarios(response.data);
    }
  };

  return (
    <div className="App">
      <h1>Agendamento de Estúdio</h1>
      <div>
        <label>Dia:</label>
        <input
          type="text"
          value={novoHorario.dia}
          onChange={(e) => setNovoHorario({ ...novoHorario, dia: e.target.value })}
        />

        <label>Hora:</label>
        <input
          type="text"
          value={novoHorario.hora}
          onChange={(e) => setNovoHorario({ ...novoHorario, hora: e.target.value })}
        />

        <label>Nome:</label>
        <input
          type="text"
          value={novoHorario.nome}
          onChange={(e) => setNovoHorario({ ...novoHorario, nome: e.target.value })}
        />

        <button onClick={handleAgendar}>Agendar</button>
      </div>
      <ul className="horarios-list">
        {horarios.map((horario) => (
          <li key={horario.id}>
            <strong>Dia:</strong> {horario.dia}, <strong>Hora:</strong> {horario.hora}, <strong>Nome:</strong> {horario.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
