"use client";

import React, { useState, useEffect } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import Ticket from "@/app/components/Ticket/Ticket";
import { XMarkIcon } from "@heroicons/react/24/solid";

const RegistrarVenta = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [fechaHora, setFechaHora] = useState(new Date());
  const [ventaRegistrada, setVentaRegistrada] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
        setProductos(res.productos || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.productoID === producto.productoID);
      if (existe) {
        return prev.map((p) =>
          p.productoID === producto.productoID
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (productoID, cantidad) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.productoID === productoID ? { ...p, cantidad: cantidad } : p
      )
    );
  };

  const eliminarDelCarrito = (productoID) => {
    setCarrito((prev) => prev.filter((p) => p.productoID !== productoID));
  };

  const calcularTotal = () =>
    carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);

  const handleRegistrarVenta = async () => {
    try {
      await MedicalExpressPosWebApi.registrarVenta({
        fechaHora: fechaHora.toISOString(),
        total: calcularTotal(),
        productos: carrito.map((p) => ({
          productoID: p.productoID,
          cantidad: p.cantidad,
        })),
      });

const now = new Date();
setVentaRegistrada({
  businessName: "Medical Office Software",
  address: "Av. Ejemplo 123, Ciudad",
  phone: "123-456-7890",
  fecha: now.toLocaleDateString(),
  hora: now.toLocaleTimeString(),
  items: carrito,
});



      setCarrito([]);
    } catch (err) {
      console.error("Error al registrar la venta", err);
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-200">
      {!ventaRegistrada ? (
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-12">
          {/* Lista de productos */}
          <section className="lg:col-span-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Productos disponibles</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {productos.map((producto) => (
                <div
                  key={producto.productoID}
                  className="p-4 transition bg-white border rounded-lg shadow-sm hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>
                  <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="w-full py-2 mt-3 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Resumen de venta */}
          <section className="p-6 bg-white rounded-lg shadow-lg lg:col-span-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Resumen de venta</h2>
            {carrito.length === 0 ? (
              <p className="italic text-gray-500">No hay productos en el carrito.</p>
            ) : (
              <ul className="mb-4 divide-y divide-gray-200">
                {carrito.map((item) => (
                  <li key={item.productoID} className="flex justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-800">{item.nombre}</p>
                      <p className="text-sm text-gray-600">
                        ${item.precio.toFixed(2)} x{" "}
                        <select
                          value={item.cantidad}
                          onChange={(e) =>
                            cambiarCantidad(item.productoID, parseInt(e.target.value))
                          }
                          className="px-2 py-1 ml-1 border border-gray-300 rounded"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </p>
                    </div>
                    <button
                      onClick={() => eliminarDelCarrito(item.productoID)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-between pt-4 text-lg font-semibold text-gray-800 border-t">
              <span>Total:</span>
              <span>${calcularTotal().toFixed(2)}</span>
            </div>

            <button
              onClick={handleRegistrarVenta}
              disabled={carrito.length === 0}
              className="w-full py-2 mt-6 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              Registrar Venta
            </button>
          </section>
        </div>
      ) : (
        <div className="max-w-3xl p-4 mx-auto bg-white shadow-lg rounded-2xl">
<Ticket
  businessName={ventaRegistrada.businessName}
  address={ventaRegistrada.address}
  phone={ventaRegistrada.phone}
  items={ventaRegistrada.items}
  fecha={ventaRegistrada.fecha}
  hora={ventaRegistrada.hora}
/>


        </div>
      )}
    </div>
  );
};

export default RegistrarVenta;
