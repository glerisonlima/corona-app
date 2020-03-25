import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./imagens/logo.webp";

import ItemList from "./ItemList";

const urlCe = "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/ce";
const urlBr = "https://covid19-brazil-api.now.sh/api/report/v1/brazil";

function App() {
  const [casosCE, setCasosCE] = useState("");
  const [mortesCe, setMortesCe] = useState("");
  const [suspeitosCe, setSuspeitosCe] = useState("");
  const [descartadosCe, setDescartadosCe] = useState("");
  const [casosBr, setCasosBr] = useState("");
  const [mortesBr, setMortesBr] = useState("");
  const [confirmadoBr, setConfirmadoBr] = useState("");
  const [curadosBr, setCuradosBr] = useState("");

  async function buscaCasosCe() {
    let res = await fetch(urlCe);
    let response = await res.json();
    const { cases, deaths, suspects, refuses } = response;
    setCasosCE(cases);
    setMortesCe(deaths);
    setSuspeitosCe(suspects);
    setDescartadosCe(refuses);
  }

  async function buscaCasosBr() {
    let res = await fetch(urlBr);
    let response = await res.json();
    const { cases, deaths, confirmed, recovered } = response.data;
    setCasosBr(confirmed);
    setMortesBr(deaths);
    setConfirmadoBr(cases);
    setCuradosBr(recovered);
  }

  useEffect(() => {
    (async () => {
      await buscaCasosCe();
      await buscaCasosBr();
    })();
  }, []);

  return (
    <div className="App container">
      <img src={logo} className="image" alt="logo" />
      <h2>Covid-19</h2>

      <div className="content">
        <div className="card border-danger">
          <div className="card-header">Casos no Ceará</div>
          <div className="card-body">
            <ItemList title="Casos" dados={casosCE} />
            <ItemList title="Mortes" dados={mortesCe} />
            <ItemList title="Suspeitas" dados={suspeitosCe} />
            <ItemList title="Descartados" dados={descartadosCe} />
          </div>
        </div>
        <div className="card border-danger">
          <div className="card-header">Casos no Brasil</div>
          <div className="card-body">
            <ItemList title="Casos" dados={casosBr} />
            <ItemList title="Mortes" dados={mortesBr} />
            <ItemList title="Confirmados" dados={confirmadoBr} />
            <ItemList title="Curados" dados={curadosBr} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
