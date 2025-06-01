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
  const [formData, setFormData] = useState({ nameOfOffice: "", address: "" });
  const [updateData, setUpdateData] = useState({ nameOfOffice: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOfficeSetup = async () => {
      setLoading(true);
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
        setError("Error al obtener la configuración.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeSetup();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdateChange = (e) =>
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      await MedicalOfficeWebApi.insertOfficeSetup(formData);
      setSuccess(true);
    } catch (err) {
      setError("Error al guardar la configuración.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      await MedicalOfficeWebApi.updateOfficeSetup(updateData);
      setFormData(updateData);
      setSuccess(true);
      setIsModalOpen(false);
    } catch (err) {
      setError("Error al actualizar la configuración.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setUpdateData({ ...formData });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card shadow={true} className="p-6 bg-white rounded-lg">
        <Typography variant="h5" color="blue-gray" className="mb-6 font-semibold text-center">
          Configuración de la Oficina
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="nameOfOffice" className="block mb-1 text-sm font-medium text-gray-700">
                Nombre de la Oficina
              </label>
              <Input
                id="nameOfOffice"
                name="nameOfOffice"
                value={formData.nameOfOffice}
                onChange={handleChange}
                placeholder="Ej. Consultorio Principal"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">
                Dirección
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej. Calle 123, Colonia, Ciudad"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 md:flex-row">
            <Button type="submit" color="blue" fullWidth={!false}>
              Guardar Configuración
            </Button>
            <Button type="button" color="green" onClick={handleOpenModal} fullWidth={!false}>
              Actualizar Configuración
            </Button>
          </div>
        </form>

        {/* Mensajes de estado */}
        {loading && <Typography className="mt-4 text-center text-blue-gray-500">Procesando...</Typography>}
        {success && <Typography className="mt-4 text-center text-green-600">¡Operación exitosa!</Typography>}
        {error && <Typography className="mt-4 text-center text-red-600">{error}</Typography>}
      </Card>

      {/* Modal de Actualización */}
      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <DialogHeader>Actualizar Configuración</DialogHeader>
        <form onSubmit={handleUpdateSubmit}>
          <DialogBody className="space-y-6">
            <div>
              <label htmlFor="updateNameOfOffice" className="block mb-1 text-sm font-medium text-gray-700">
                Nombre de la Oficina
              </label>
              <Input
                id="updateNameOfOffice"
                name="nameOfOffice"
                value={updateData.nameOfOffice}
                onChange={handleUpdateChange}
              />
            </div>
            <div>
              <label htmlFor="updateAddress" className="block mb-1 text-sm font-medium text-gray-700">
                Dirección
              </label>
              <Input
                id="updateAddress"
                name="address"
                value={updateData.address}
                onChange={handleUpdateChange}
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-end gap-2">
            <Button color="red" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" color="green">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
