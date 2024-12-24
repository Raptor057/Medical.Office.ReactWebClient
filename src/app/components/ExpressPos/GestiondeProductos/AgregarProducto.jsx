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
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const producto = { Nombre: nombre, Precio: parseFloat(precio), Stock: parseInt(stock, 10) };
      const response = await MedicalExpressPosWebApi.agregarProducto(producto);
      setMessage(`Producto agregado correctamente con ID: ${response.id}`);
      setNombre("");
      setPrecio("");
      setStock("");
    } catch (error) {
      setMessage(`Error al agregar producto: ${error}`);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader color="green" className="text-center">
        <Typography variant="h5" color="white">
          Agregar Producto
        </Typography>
      </CardHeader>
      <CardBody className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Nombre del Producto"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              label="Precio"
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              label="Stock"
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            color="green"
            fullWidth
          >
            Agregar Producto
          </Button>
        </form>
        {message && (
          <Typography variant="small" color="blue-gray" className="text-center mt-4">
            {message}
          </Typography>
        )}
      </CardBody>
      <CardFooter>
        <Typography variant="small" color="gray" className="text-center">
          Complete todos los campos para agregar un nuevo producto.
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default AgregarProducto;
