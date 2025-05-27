import React, { useState, useEffect, useRef } from "react";

const Ticket = ({ businessName, address, phone, items }) => {
  const ticketRef = useRef(null);
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      });
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const printTicket = () => {
    const printContent = ticketRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Se imprime automáticamente cuando los items se actualizan (solo la primera vez que se carga con items nuevos)
  useEffect(() => {
    if (items.length > 0) {
      printTicket();
    }
  }, [items]);

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold text-center">Ticket de Venta</h2>

{/* Contenedor del ticket con referencia */}
<div ref={ticketRef} id="ticket-container" style={{ textAlign: "center", fontFamily: "'Courier New', monospace" }}>
  <div style={{ width: "78mm", padding: "10px", margin: "auto", textAlign: "left" }}>

    {/* Imagen debajo del título "Medical Office" */}
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
    <svg
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  width="80px"
  height="auto"
  viewBox="0 0 32 32"
  style={{ enableBackground: "new 0 0 32 32" }}
  xmlSpace="preserve"
>
  <path
    id="medical_1_"
    d="M16,31.36c-0.199,0-0.36-0.161-0.36-0.36v-8c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v8
	C16.36,31.199,16.199,31.36,16,31.36z M14.382,27.186c-0.047,0-0.095-0.01-0.141-0.029c-0.999-0.427-1.697-1.533-1.697-2.692
	c0-1.22,0.518-2.151,1.631-2.932c0.164-0.113,0.387-0.074,0.501,0.088c0.114,0.163,0.075,0.388-0.088,0.502
	c-0.928,0.65-1.325,1.352-1.325,2.342c0,0.879,0.518,1.714,1.259,2.03c0.183,0.078,0.268,0.289,0.19,0.473
	C14.655,27.104,14.522,27.186,14.382,27.186z M17.617,27.186c-0.108,0-0.216-0.05-0.287-0.143c-0.12-0.158-0.089-0.385,0.069-0.505
	c0.924-0.7,1.335-1.204,1.335-2.335c0-1.4-1.379-2.346-2.839-3.346c-1.642-1.125-3.339-2.288-3.339-4.272
	c0-1.106,0.649-2.115,1.654-2.57c0.181-0.08,0.395-0.001,0.477,0.18s0.001,0.395-0.18,0.477c-0.748,0.338-1.231,1.089-1.231,1.914
	c0,1.604,1.47,2.612,3.026,3.679c1.55,1.062,3.153,2.159,3.153,3.939c0,1.412-0.569,2.111-1.62,2.909
	C17.77,27.161,17.693,27.186,17.617,27.186z M17.617,19.845c-0.108,0-0.216-0.05-0.287-0.143c-0.12-0.159-0.089-0.385,0.069-0.505
	c0.924-0.699,1.335-1.202,1.335-2.334c0-1.25-1.1-2.138-2.375-3.025v4.164c0,0.199-0.161,0.36-0.36,0.36s-0.36-0.161-0.36-0.36
	v-4.659c-1.558-1.072-3.084-2.215-3.084-4.097c0-1.107,0.649-2.116,1.654-2.57c0.181-0.08,0.395-0.001,0.477,0.18
	s0.001,0.395-0.18,0.477c-0.748,0.338-1.231,1.089-1.231,1.914c0,1.374,1.078,2.31,2.364,3.22V5.333c-1.131-0.174-2-1.154-2-2.333
	c0-1.301,1.059-2.36,2.36-2.36c1.302,0,2.36,1.059,2.36,2.36c0,1.179-0.869,2.159-2,2.333v7.63c1.532,1.049,3.095,2.142,3.095,3.9
	c0,1.413-0.569,2.113-1.62,2.909C17.77,19.82,17.693,19.845,17.617,19.845z M16,4.639c0.01,0,0.02,0,0.03,0.001
	c0.89-0.016,1.61-0.745,1.61-1.64c0-0.904-0.735-1.64-1.64-1.64S14.36,2.096,14.36,3c0,0.895,0.72,1.624,1.61,1.64
	C15.98,4.639,15.99,4.639,16,4.639z M19,13.36c-0.135,0-0.265-0.076-0.325-0.207c-0.085-0.18-0.008-0.394,0.172-0.479
	c1.041-0.491,1.888-1.88,1.888-3.098c0-1.894,1.059-2.936,2.979-2.936H30c0.199,0,0.36,0.161,0.36,0.36S30.199,7.36,30,7.36h-6.286
	c-1.178,0-1.875,0.411-2.138,1.28H28c0.199,0,0.36,0.161,0.36,0.36S28.199,9.36,28,9.36h-6.54c-0.004,0.07-0.005,0.142-0.005,0.216
	c0,0.334-0.057,0.698-0.164,1.065h4.688c0.199,0,0.36,0.161,0.36,0.36s-0.161,0.36-0.36,0.36h-4.963
	c-0.392,0.819-1.03,1.572-1.862,1.964C19.104,13.349,19.052,13.36,19,13.36z M13,13.36c-0.052,0-0.104-0.011-0.153-0.034
	c-0.832-0.392-1.47-1.145-1.861-1.964H6c-0.199,0-0.36-0.161-0.36-0.36s0.161-0.36,0.36-0.36h4.71
	c-0.107-0.368-0.163-0.731-0.163-1.065c0-0.074-0.002-0.146-0.005-0.216H4C3.801,9.36,3.64,9.199,3.64,9S3.801,8.64,4,8.64h6.426
	c-0.263-0.869-0.96-1.28-2.138-1.28H2C1.801,7.36,1.64,7.199,1.64,7S1.801,6.64,2,6.64h6.288c1.684,0,2.704,0.801,2.931,2.273
	c0.005,0.023,0.009,0.046,0.01,0.071c0.025,0.187,0.038,0.384,0.038,0.592c0,1.218,0.846,2.608,1.886,3.098
	c0.18,0.085,0.257,0.299,0.172,0.479C13.264,13.284,13.135,13.36,13,13.36z M17.617,12.361c-0.113,0-0.225-0.053-0.295-0.153
	c-0.114-0.163-0.074-0.387,0.088-0.501c0.929-0.651,1.324-1.352,1.324-2.342c0-0.879-0.518-1.713-1.259-2.03
	c-0.183-0.078-0.268-0.29-0.189-0.472c0.078-0.183,0.291-0.268,0.473-0.19c0.998,0.426,1.696,1.533,1.696,2.692
	c0,1.22-0.519,2.151-1.631,2.932C17.761,12.34,17.688,12.361,17.617,12.361z"
  />
  <rect
    id="_Transparent_Rectangle"
    style={{ fill: "none" }}
    width={32}
    height={32}
  />
</svg>

    </div>

    <div style={{ textAlign: "center", fontWeight: "bold" }}>{businessName}</div>
    <div style={{ textAlign: "center" }}>{address}</div>
    <div style={{ textAlign: "center" }}>Tel: {phone}</div>
    <div style={{ borderTop: "1px dashed black", margin: "10px 0" }}></div>
    <div>Fecha: {dateTime.date}</div>
    <div>Hora: {dateTime.time}</div>
    <div style={{ borderTop: "1px dashed black", margin: "10px 0" }}></div>
    <div style={{ fontWeight: "bold" }}>Producto &nbsp; Cant &nbsp; Precio</div>
    <div>------------------------------------</div>

    {items.map((item, index) => (
      <div key={index}>
        {item.name} {item.quantity} ${item.price ? item.price.toFixed(2) : "0.00"}
      </div>
    ))}

    <div>------------------------------------</div>
    <div style={{ fontWeight: "bold" }}>Total: ${calculateTotal().toFixed(2)}</div>
    <div style={{ borderTop: "1px dashed black", margin: "10px 0" }}></div>
    <div style={{ textAlign: "center" }}>Gracias por su compra</div>
    <div style={{ textAlign: "center" }}>{businessName}</div>

        {/* Imagen después de "Medical Office Software" */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
        <svg
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  width="100px"
  height="100px"
  viewBox="0 0 1155 1155"
  enableBackground="new 0 0 1155 1155"
  xmlSpace="preserve"
>
  <rect x={0} y={0} width={1155} height={1155} fill="rgb(255,255,255)" />
  <g transform="translate(70,70)">
    <g transform="translate(280,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,0) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,35) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,70) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,70) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,70) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,70) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,70) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,105) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,105) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,105) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,105) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,105) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,140) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,175) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,175) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,175) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,175) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,175) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,175) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,210) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,245) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(105,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(140,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,280) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(105,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(140,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,315) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(105,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(140,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,350) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,385) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,420) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,455) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,490) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,525) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(105,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(140,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,560) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(105,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(140,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,595) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(105,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(245,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,630) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,665) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(35,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(175,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(210,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,700) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,735) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,770) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,805) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,840) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,875) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(805,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(945,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,910) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(350,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(420,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(525,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(735,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(770,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(875,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(910,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(980,945) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(280,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(315,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(385,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(455,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(490,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(560,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(595,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(630,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(665,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(700,980) scale(0.35,0.35)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(0,0) scale(2.45, 2.45)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <g>
          <rect x={15} y={15} style={{ fill: "none" }} width={70} height={70} />
          <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
        </g>
      </g>
    </g>
    <g transform="translate(770,0) scale(2.45, 2.45)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <g>
          <rect x={15} y={15} style={{ fill: "none" }} width={70} height={70} />
          <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
        </g>
      </g>
    </g>
    <g transform="translate(0,770) scale(2.45, 2.45)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <g>
          <rect x={15} y={15} style={{ fill: "none" }} width={70} height={70} />
          <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
        </g>
      </g>
    </g>
    <g transform="translate(70,70) scale(1.05, 1.05)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(840,70) scale(1.05, 1.05)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
    <g transform="translate(70,840) scale(1.05, 1.05)">
      <g transform="" style={{ fill: "rgb(0, 0, 0)" }}>
        <rect width={100} height={100} />
      </g>
    </g>
  </g>
</svg>

    </div>

  </div>
</div>


      {/* Botón de impresión */}
      <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={printTicket}>
        Imprimir Ticket
      </button>

      {/* Botón para regresar al registro de venta */}
      <button className="w-full px-4 py-2 mt-2 text-white bg-gray-500 rounded hover:bg-gray-600" onClick={() => window.location.reload()}>
        Volver al Registro de Venta
      </button>

      {/* CSS para ocultar todo menos el ticket al imprimir */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #ticket-container, #ticket-container * {
            visibility: visible;
          }
          #ticket-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Ticket;
