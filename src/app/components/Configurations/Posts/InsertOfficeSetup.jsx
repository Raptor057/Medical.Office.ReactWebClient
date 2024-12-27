'use client';

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function OfficeSetupForm() {
  const [formData, setFormData] = useState({
    nameOfOffice: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    nameOfOffice: "",
    address: "",
  });

  // Obtener configuración existente al cargar el componente
  useEffect(() => {
    const fetchOfficeSetup = async () => {
      setLoading(true);
      setError(null);
      try {
        const configData = await MedicalOfficeWebApi.getAllConfigurations();
        const officeSetup = configData?.allConfigurations?.officeSetup;
        if (officeSetup) {
          setFormData({
            nameOfOffice: officeSetup.nameOfOffice || "",
            address: officeSetup.address || "",
          });
        }
      } catch (err) {
        setError(err || "Error al obtener la configuración de la oficina.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeSetup();
  }, []);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario para inserción
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.insertOfficeSetup(formData);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Manejo del envío del formulario para actualización
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.updateOfficeSetup(updateData);
      setSuccess(true);
      setIsModalOpen(false);
      setFormData(updateData); // Actualizar el estado principal
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setUpdateData({ ...formData });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Formulario de Inserción */}
      <Card shadow={true} className="max-w-lg p-6 mx-auto bg-white rounded-lg">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-6 text-center"
        >
          Configuración de Oficina
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nameOfOffice"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Nombre de la Oficina
            </label>
            <Input
              type="text"
              name="nameOfOffice"
              id="nameOfOffice"
              value={formData.nameOfOffice}
              onChange={handleChange}
              placeholder="Ingresa el nombre de la oficina"
              size="md"
              className="text-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <Input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ingresa la dirección de la oficina"
              size="md"
              className="text-gray-800"
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              color="indigo"
              className="w-full text-lg font-semibold"
            >
              Guardar Configuración
            </Button>
            <Button
              type="button"
              color="green"
              onClick={handleOpenModal}
              className="ml-2 text-lg font-semibold"
            >
              Actualizar Configuración
            </Button>
          </div>
        </form>
      </Card>

      {/* Modal de Actualización */}
      <Dialog open={isModalOpen} handler={setIsModalOpen} size="md">
        <DialogHeader>Actualizar Configuración de Oficina</DialogHeader>
        <DialogBody>
          <form onSubmit={handleUpdateSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="updateNameOfOffice"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Nombre de la Oficina
              </label>
              <Input
                type="text"
                name="nameOfOffice"
                id="updateNameOfOffice"
                value={updateData.nameOfOffice}
                onChange={handleUpdateChange}
                placeholder="Actualiza el nombre de la oficina"
                size="md"
                className="text-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="updateAddress"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Dirección
              </label>
              <Input
                type="text"
                name="address"
                id="updateAddress"
                value={updateData.address}
                onChange={handleUpdateChange}
                placeholder="Actualiza la dirección de la oficina"
                size="md"
                className="text-gray-800"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={handleCloseModal}
            className="text-lg font-semibold"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="green"
            onClick={handleUpdateSubmit}
            className="ml-2 text-lg font-semibold"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Mensajes */}
      {loading && (
        <Typography color="blue-gray" className="mt-2 text-center">
          Cargando...
        </Typography>
      )}
      {success && (
        <Typography color="green" className="mt-2 text-center">
          ¡Operación exitosa!
        </Typography>
      )}
      {error && (
        <Typography color="red" className="mt-2 text-center">
          {error}
        </Typography>
      )}
    </div>
  );
}
