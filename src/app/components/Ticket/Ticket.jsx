import React, { useState, useEffect, useRef } from "react";
import MedicalImage from "@/app/components/Ticket/MedicalSvgImage";
import DevelopmentQR from "@/app/components/Ticket/DevelopmentQR";


const Ticket = ({ businessName, address, phone, items, fecha, hora }) => {

  const ticketRef = useRef(null);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  useEffect(() => {
    const now = new Date();
    setDateTime({
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    });
  }, []);

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + (item.precio || item.price || 0) * item.cantidad,
      0
    );
  };

  const printTicket = () => {
    const printContent = ticketRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=600,height=800');
printWindow.document.write(`
  <html>
    <head>
      <title>Imprimir Ticket</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          padding: 0;
          margin: 0;
        }
        #ticket-container {
          width: 80mm;
          margin: auto;
          padding: 10px;
        }
        .line {
          border-top: 1px dashed black;
          margin: 8px 0;
        }
        .center {
          text-align: center;
        }
        .bold {
          font-weight: bold;
        }
        .product-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .product-line span {
          display: inline-block;
          word-break: break-word;
        }
      </style>
    </head>
    <body>
      ${printContent}
      <script>
        window.onload = function () {
          window.print();
          window.onafterprint = () => window.close();
        };
      </script>
    </body>
  </html>
`);

    printWindow.document.close();
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold text-center">Ticket de Venta</h2>

      <div ref={ticketRef} id="ticket-container">
        <div style={{ width: "80mm", margin: "auto", padding: "10px" }}>

          <div className="center">
            <MedicalImage />
          </div>

          <div className="center bold">{businessName}</div>
          <div className="center">{address}</div>
          <div className="center">Tel: {phone}</div>

          <div className="line"></div>

<div>Fecha: {fecha}</div>
<div>Hora: {hora}</div>

          <div className="line"></div>
          <div className="bold">Producto         Cant   Precio</div>
          <div>----------------------------------------</div>

          {items.map((item, index) => (
            <div key={index} className="product-line">
              <span style={{ maxWidth: "50%", overflow: "hidden", whiteSpace: "nowrap" }}>
                {item.nombre || item.name}
              </span>
              <span>{item.cantidad}</span>
              <span>${(item.precio || item.price || 0).toFixed(2)}</span>
            </div>
          ))}

          <div>----------------------------------------</div>
          <div className="bold product-line">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>

          <div className="line"></div>
          <div className="center">Gracias por su compra</div>
          <div className="center">{businessName}</div>

          <div className="center">
            <DevelopmentQR />
          </div>
        </div>
      </div>

      <button
        className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={printTicket}
      >
        Imprimir Ticket
      </button>

      <button
        className="w-full px-4 py-2 mt-2 text-white bg-gray-500 rounded hover:bg-gray-600"
        onClick={() => window.location.reload()}
      >
        Volver al Registro de Venta
      </button>
    </div>
  );
};

export default Ticket;
