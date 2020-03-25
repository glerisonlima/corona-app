import React from "react";

import "./App.css";

export default function itemList({ title, dados }) {
  return (
    <div className="card-item">
      <p className="card-item-title">{title}: </p>
      <span className="card-item-dados">{dados}</span>
    </div>
  );
}
