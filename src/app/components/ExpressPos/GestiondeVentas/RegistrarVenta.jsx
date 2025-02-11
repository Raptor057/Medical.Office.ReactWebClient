// "use client";

// import React, { useState, useEffect } from "react";
// import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

// const RegistrarVenta = () => {
//   const [productos, setProductos] = useState([]);
//   const [productosSeleccionados, setProductosSeleccionados] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [fechaHora, setFechaHora] = useState(null); // Inicialmente null para evitar errores de hidratación

//   useEffect(() => {
//     const fetchProductos = async () => {
//       try {
//         const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
//         setProductos(response.productos || []);
//       } catch (error) {
//         console.error("Error al obtener productos:", error);
//       }
//     };

//     fetchProductos();

//     // Configurar la fecha/hora actual al montar el componente en UTC
//     const ahoraUTC = new Date();
//     setFechaHora(
//       new Date(Date.UTC(
//         ahoraUTC.getUTCFullYear(),
//         ahoraUTC.getUTCMonth(),
//         ahoraUTC.getUTCDate(),
//         ahoraUTC.getUTCHours(),
//         ahoraUTC.getUTCMinutes(),
//         ahoraUTC.getUTCSeconds()
//       ))
//     );
//   }, []);

//   const handleAgregarProducto = (productoID, cantidad) => {
//     const producto = productos.find((p) => p.productoID === productoID);
//     if (!producto || cantidad <= 0) return;

//     const productoEnLista = productosSeleccionados.find(
//       (p) => p.productoID === productoID
//     );

//     if (productoEnLista) {
//       setProductosSeleccionados((prev) =>
//         prev.map((p) =>
//           p.productoID === productoID
//             ? { ...p, cantidad: p.cantidad + cantidad }
//             : p
//         )
//       );
//     } else {
//       setProductosSeleccionados((prev) => [
//         ...prev,
//         {
//           productoID,
//           cantidad,
//           nombre: producto.nombre,
//           precio: producto.precio,
//         },
//       ]);
//     }

//     setTotal((prev) => prev + producto.precio * cantidad);
//   };

//   const handleEliminarProducto = (productoID) => {
//     const producto = productosSeleccionados.find(
//       (p) => p.productoID === productoID
//     );
//     if (!producto) return;

//     setProductosSeleccionados((prev) =>
//       prev.filter((p) => p.productoID !== productoID)
//     );
//     setTotal((prev) => prev - producto.precio * producto.cantidad);
//   };

//   const handleRegistrarVenta = async () => {
//     const productos = productosSeleccionados.map((p) => ({
//       productoID: p.productoID,
//       cantidad: p.cantidad,
//     }));

//     try {
//       await MedicalExpressPosWebApi.registrarVenta({
//         fechaHora: fechaHora.toISOString(), // Enviar la fecha en formato ISO UTC
//         total,
//         productos,
//       });
//       alert("Venta registrada exitosamente.");
//       setProductosSeleccionados([]);
//       setTotal(0);
//     } catch (error) {
//       console.error("Error al registrar la venta:", error);
//       alert("Error al registrar la venta.");
//     }
//   };

//   return (
//     <div className="container px-4 py-6 mx-auto">
//       <div className="py-3 text-center text-white bg-blue-500 rounded">
//         <h1 className="text-xl font-bold">Registrar Venta</h1>
//       </div>
//       <div className="mt-4">
//         <label className="block mb-2 font-medium">
//           Fecha y Hora:
//           {fechaHora ? ( // Renderiza la fecha solo después de que esté disponible
//             <span className="block w-full p-2 mt-1 text-gray-700 bg-gray-100 border rounded">
//               {fechaHora.toUTCString()} {/* Mostrar la fecha en formato UTC */}
//             </span>
//           ) : (
//             <span className="block w-full p-2 mt-1 text-gray-700 bg-gray-100 border rounded">
//               Cargando...
//             </span>
//           )}
//         </label>
//       </div>
//       <div className="mt-4">
//         <label className="block mb-2 font-medium">
//           Seleccionar Producto:
//           <select
//             className="block w-full p-2 mt-1 border rounded"
//             onChange={(e) =>
//               handleAgregarProducto(Number(e.target.value), 1)
//             }
//           >
//             <option value="">-- Seleccione un Producto --</option>
//             {productos.map((producto) => (
//               <option key={producto.productoID} value={producto.productoID}>
//                 {producto.nombre} - ${producto.precio}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       <div className="mt-6">
//         <h2 className="mb-2 text-lg font-semibold">Productos Seleccionados</h2>
//         <ul className="p-4 bg-white border rounded shadow-md">
//           {productosSeleccionados.map((producto) => (
//             <li
//               key={producto.productoID}
//               className="flex items-center justify-between mb-2"
//             >
//               <span>
//                 {producto.nombre} - ${producto.precio} x {producto.cantidad}
//               </span>
//               <button
//                 onClick={() => handleEliminarProducto(producto.productoID)}
//                 className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
//               >
//                 Eliminar
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="mt-4">
//         <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
//       </div>
//       <button
//         onClick={handleRegistrarVenta}
//         className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
//       >
//         Registrar Venta
//       </button>
//     </div>
//   );
// };

// export default RegistrarVenta;
"use client";

import React, { useState, useEffect } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import Ticket from "@/app/components/Ticket"; // Importamos el componente Ticket

const RegistrarVenta = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaHora, setFechaHora] = useState(null);
  const [ventaRegistrada, setVentaRegistrada] = useState(null); // Estado para mostrar el ticket

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
        setProductos(response.productos || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
    setFechaHora(new Date()); // Fecha y hora actual
  }, []);

  const handleAgregarProducto = (productoID, cantidad) => {
    const producto = productos.find((p) => p.productoID === productoID);
    if (!producto || cantidad <= 0) return;

    const productoEnLista = productosSeleccionados.find(
      (p) => p.productoID === productoID
    );

    if (productoEnLista) {
      setProductosSeleccionados((prev) =>
        prev.map((p) =>
          p.productoID === productoID
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      );
    } else {
      setProductosSeleccionados((prev) => [
        ...prev,
        {
          productoID,
          cantidad,
          nombre: producto.nombre,
          precio: producto.precio,
        },
      ]);
    }

    setTotal((prev) => prev + producto.precio * cantidad);
  };

  const handleEliminarProducto = (productoID) => {
    const producto = productosSeleccionados.find(
      (p) => p.productoID === productoID
    );
    if (!producto) return;

    setProductosSeleccionados((prev) =>
      prev.filter((p) => p.productoID !== productoID)
    );
    setTotal((prev) => prev - producto.precio * producto.cantidad);
  };

  const handleRegistrarVenta = async () => {
    const productosVenta = productosSeleccionados.map((p) => ({
      productoID: p.productoID,
      cantidad: p.cantidad,
    }));

    try {
      await MedicalExpressPosWebApi.registrarVenta({
        fechaHora: fechaHora.toISOString(),
        total,
        productos: productosVenta,
      });

      setVentaRegistrada({
        businessName: "Medical Office Software",
        address: "Av. Ejemplo 123, Ciudad",
        phone: "123-456-7890",
        fechaHora,
        items: productosSeleccionados,
      });

      setProductosSeleccionados([]);
      setTotal(0);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      {!ventaRegistrada ? (
        <>
          <div className="py-3 text-center text-white bg-blue-500 rounded">
            <h1 className="text-xl font-bold">Registrar Venta</h1>
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-medium">
              Fecha y Hora:
              {fechaHora ? (
                <span className="block w-full p-2 mt-1 text-gray-700 bg-gray-100 border rounded">
                  {fechaHora.toUTCString()}
                </span>
              ) : (
                <span className="block w-full p-2 mt-1 text-gray-700 bg-gray-100 border rounded">
                  Cargando...
                </span>
              )}
            </label>
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-medium">
              Seleccionar Producto:
              <select
                className="block w-full p-2 mt-1 border rounded"
                onChange={(e) =>
                  handleAgregarProducto(Number(e.target.value), 1)
                }
              >
                <option value="">-- Seleccione un Producto --</option>
                {productos.map((producto) => (
                  <option key={producto.productoID} value={producto.productoID}>
                    {producto.nombre} - ${producto.precio}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Productos Seleccionados</h2>
            <ul className="p-4 bg-white border rounded shadow-md">
              {productosSeleccionados.map((producto) => (
                <li
                  key={producto.productoID}
                  className="flex items-center justify-between mb-2"
                >
                  <span>
                    {producto.nombre} - ${producto.precio} x {producto.cantidad}
                  </span>
                  <button
                    onClick={() => handleEliminarProducto(producto.productoID)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
          <button
            onClick={handleRegistrarVenta}
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Registrar Venta
          </button>
        </>
      ) : (
        <div className="p-4 bg-white rounded shadow-lg">
          {/* <h2 className="text-xl font-bold text-center">Ticket de Venta</h2> */}
          <Ticket
            businessName={ventaRegistrada.businessName}
            address={ventaRegistrada.address}
            phone={ventaRegistrada.phone}
            items={ventaRegistrada.items}
          />
        </div>
      )}
    </div>
  );
};

export default RegistrarVenta;
