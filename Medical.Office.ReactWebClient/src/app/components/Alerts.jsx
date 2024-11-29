import React from "react";

const Alert = ({ isSuccess, message, onClose }) => {
  const alertStyles = isSuccess
    ? "bg-green-600 text-white"
    : "bg-red-600 text-white";
  const alertMessage = isSuccess ? "Operación exitosa" : message;

  return (
    <div
      role="alert"
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        alertStyles
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{alertMessage || "Ocurrió un error desconocido."}</span> {/* Asegúrate de mostrar algo si no hay mensaje */}
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold text-white hover:opacity-75"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
