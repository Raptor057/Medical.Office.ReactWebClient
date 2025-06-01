"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const resetForm = () => {
    setNombre("");
    setPrecio("");
    setStock("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(precio) < 0 || parseInt(stock, 10) < 0) {
      setMessage({ type: "error", text: "El precio y el stock no pueden ser negativos." });
      return;
    }

    try {
      const producto = {
        Nombre: nombre.trim(),
        Precio: parseFloat(precio),
        Stock: parseInt(stock, 10),
      };

      const response = await MedicalExpressPosWebApi.agregarProducto(producto);

      setMessage({
        type: "success",
        text: `✅ Producto agregado correctamente con ID: ${response.id}`,
      });
      resetForm();
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Error al agregar producto: ${error.message || error}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-300">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader
          floated={false}
          shadow={false}
          className="py-4 text-center text-white bg-green-600 rounded-t-2xl"
        >
          <Typography variant="h5">Agregar Producto</Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nombre del Producto"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <Input
              label="Precio"
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
            />

            <Input
              label="Stock"
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min="0"
            />

            <Button
              type="submit"
              color="green"
              fullWidth
              className="flex items-center justify-center gap-2 text-base font-semibold"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Agregar Producto
            </Button>
          </form>

          {message.text && (
            <div
              className={`rounded-md p-3 text-center font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
        </CardBody>

        <CardFooter className="text-center">
          <Typography variant="small" color="gray">
            Complete todos los campos para registrar un nuevo producto en el sistema.
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AgregarProducto;
