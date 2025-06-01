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
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const ActualizarProducto = ({ productoId, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({ nombre: "", precio: "", stock: "" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
const fetchProducto = async () => {
  try {
    setLoading(true);
    const response = await MedicalExpressPosWebApi.obtenerProductoPorId(productoId);
    const producto = response.producto; // ✅ CORRECTO

    setFormData({
      nombre: producto.nombre ?? "",
      precio: producto.precio ?? 0,
      stock: producto.stock ?? 0,
    });
  } catch (err) {
    setError("Error al cargar el producto.");
  } finally {
    setLoading(false);
  }
};



    if (productoId) fetchProducto();
  }, [productoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (parseFloat(formData.precio) < 0 || parseInt(formData.stock) < 0) {
      setError("El precio y el stock no pueden ser negativos.");
      return;
    }

    try {
      setSubmitting(true);
      await MedicalExpressPosWebApi.actualizarProducto(productoId, {
        nombre: formData.nombre.trim(),
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock, 10),
      });
      setSuccessMsg("✅ Producto actualizado correctamente.");
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      setError("Error al actualizar el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-300">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
        <CardHeader floated={false} shadow={false} className="py-4 text-center text-white bg-blue-600 rounded-t-2xl">
          <Typography variant="h5">Actualizar Producto</Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-6">
          {loading && (
            <div className="font-medium text-center text-blue-700">Cargando información del producto...</div>
          )}

          {error && (
            <div className="px-4 py-2 font-medium text-center text-red-800 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="px-4 py-2 font-medium text-center text-green-800 bg-green-100 rounded-md">
              {successMsg}
            </div>
          )}

          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Nombre del Producto"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Precio"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
              <Button
                type="submit"
                color="blue"
                fullWidth
                disabled={submitting}
                className="flex items-center justify-center gap-2 font-semibold"
              >
                {submitting && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
                {submitting ? "Actualizando..." : "Actualizar Producto"}
              </Button>
            </form>
          )}
        </CardBody>

        <CardFooter className="text-center">
          <Typography variant="small" color="gray">
            Asegúrese de que los datos sean correctos antes de enviar.
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActualizarProducto;
