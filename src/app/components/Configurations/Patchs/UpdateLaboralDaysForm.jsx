'use client';

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Input,
  Switch,
  Select,
  Option,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function UpdateLaboralDaysForm() {
  const [workingHours, setWorkingHours] = useState([]); // Lista de horarios laborales
  const [selectedDay, setSelectedDay] = useState(null); // Día seleccionado para actualizar
  const [formData, setFormData] = useState({
    laboral: true,
    openingTime: "",
    closingTime: "",
  });
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado de éxito

  // Obtener horarios laborales
  useEffect(() => {
    const fetchWorkingHours = async () => {
      setLoading(true);
      setError(null);
      try {
        const configData = await MedicalOfficeWebApi.getAllConfigurations();
        const workingHoursDto = configData.allConfigurations?.weeklyWorkingHours?.workingHoursDto || [];
        setWorkingHours(workingHoursDto);
      } catch (err) {
        setError(err); // Capturar mensaje legible
      } finally {
        setLoading(false);
      }
    };

    fetchWorkingHours();
  }, []);

  // Manejo de selección de día
  const handleDayChange = (id) => {
    const selected = workingHours.find((day) => day.id === id);
    if (selected) {
      setSelectedDay(id);
      setFormData({
        laboral: selected.laboral,
        openingTime: selected.openingTime,
        closingTime: selected.closingTime,
      });
    }
    setSuccess(false);
    setError(null);
  };

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (value) => {
    setFormData({
      ...formData,
      laboral: value,
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.updateLaboralDays(selectedDay, formData);
      setSuccess(true);

      // Actualizar la lista localmente
      setWorkingHours((prev) =>
        prev.map((day) =>
          day.id === selectedDay
            ? { ...day, laboral: formData.laboral, openingTime: formData.openingTime, closingTime: formData.closingTime }
            : day
        )
      );
    } catch (err) {
      setError(err); // Capturar mensaje legible
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Actualizar Días Laborales
      </Typography>

      {/* Mensajes de carga o error */}
      {loading && <Typography color="blue-gray">Cargando datos...</Typography>}
      {error && <Typography color="red">{error}</Typography>}

      {/* Selector de día */}
      <Card className="shadow-md p-4">
        <Typography variant="h6" color="blue-gray" className="font-bold mb-4">
          Seleccione un día para actualizar
        </Typography>
        <Select
          label="Día"
          value={selectedDay || ""}
          onChange={(e) => handleDayChange(parseInt(e))}
        >
          {workingHours.map((day) => (
            <Option key={day.id} value={day.id}>
              {day.days}
            </Option>
          ))}
        </Select>
      </Card>

      {/* Formulario de actualización */}
      {selectedDay && (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-bold text-center">
            Actualizar Horario de Trabajo
          </Typography>

          <div className="mt-4">
            <Typography variant="small" color="blue-gray" className="mb-2">
              Laboral
            </Typography>
            <Switch
              label={formData.laboral ? "Sí" : "No"}
              checked={formData.laboral}
              onChange={(e) => handleSwitchChange(e.target.checked)}
            />
          </div>

          <div className="mt-4">
            <Input
              type="time"
              label="Hora de Apertura"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              type="time"
              label="Hora de Cierre"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" color="green" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>

          {/* Mensajes de éxito */}
          {success && (
            <Typography color="green" className="mt-2">
              ¡Horario actualizado con éxito!
            </Typography>
          )}
        </form>
      )}
    </div>
  );
}
