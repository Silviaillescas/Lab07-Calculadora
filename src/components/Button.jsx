// src/components/Button.jsx
import React from 'react';
import './Button.css'; // Asegúrate de crear este archivo para estilos

function Button({ label, onClick }) {
  return (
    <button className="button" onClick={() => onClick(label)}>{label}</button>
  );
}

export default Button;
