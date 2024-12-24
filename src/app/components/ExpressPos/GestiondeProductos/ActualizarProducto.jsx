"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const ActualizarProducto = ({ productoId, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const producto = await MedicalExpressPosWebApi.obtenerProductoPorId(productoId);
        setFormData({
          nombre: producto.nombre,
          precio: producto.precio,
          stock: producto.stock,
        });
        setLoading(false);
      } catch (err) {
        setError("Error al cargar el producto.");
        setLoading(false);
      }
    };

    if (productoId) {
      fetchProducto();
    }
  }, [productoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await MedicalExpressPosWebApi.actualizarProducto(productoId, {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock, 10),
      });
      setLoading(false);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      setError("Error al actualizar el producto.");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader color="blue" className="text-center">
        <Typography variant="h5" color="white">
          Actualizar Producto
        </Typography>
      </CardHeader>
      <CardBody className="space-y-6">
        {loading && <Typography color="blue">Cargando...</Typography>}
        {error && <Typography color="red">{error}</Typography>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Nombre"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Input
              label="Precio"
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Input
              label="Stock"
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button
            type="submit"
            color="blue"
            fullWidth
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar Producto"}
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <Typography variant="small" color="gray" className="text-center">
          Asegúrese de que los campos sean correctos antes de enviar.
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default ActualizarProducto;
