"use client";

import React, { useEffect, useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import ActualizarProducto from "./ActualizarProducto";
import {
  Typography,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchProductos = async () => {
    try {
      const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
      setProductos(response.productos || []);
      setFilteredProductos(response.productos || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const results = productos.filter((producto) =>
      producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductos(results);
  }, [searchTerm, productos]);

  const handleEdit = (productoID) => {
    setEditingProductId(productoID);
    setOpenModal(true);
  };

  const handleUpdateSuccess = () => {
    setOpenModal(false);
    setEditingProductId(null);
    fetchProductos();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="py-4 text-center text-white bg-blue-600 shadow-lg rounded-t-xl">
          <Typography variant="h5">Gestión de Productos</Typography>
        </div>

        <div className="mt-6">
          <Input
            label="Buscar producto por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            crossOrigin=""
            className="bg-white"
          />
        </div>

        <div className="p-4 mt-6 overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="font-semibold text-gray-700 bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.length > 0 ? (
                filteredProductos.map((producto) => (
                  <tr
                    key={producto.productoID}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{producto.productoID}</td>
                    <td className="px-4 py-2">{producto.nombre}</td>
                    <td className="px-4 py-2">${parseFloat(producto.precio).toFixed(2)}</td>
                    <td className="px-4 py-2">{producto.stock}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(producto.productoID)}
                        className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-600">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de edición */}
      <Dialog open={openModal} handler={() => setOpenModal(false)} size="xl">
        <DialogHeader>
          <Typography variant="h5">Editar Producto</Typography>
        </DialogHeader>

        <DialogBody divider className="max-h-[70vh] overflow-auto">
        {editingProductId && (
        <ActualizarProducto
          key={editingProductId}
          productoId={editingProductId}
          onUpdateSuccess={handleUpdateSuccess}
        />
        )}
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpenModal(false);
              setEditingProductId(null);
            }}
            className="mr-2"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ListarProductos;
