'use client';

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Input,
  Switch,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function UpdateLaboralDaysForm() {
  const [workingHours, setWorkingHours] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [formData, setFormData] = useState({
    laboral: true,
    openingTime: "",
    closingTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchWorkingHours = async () => {
      setLoading(true);
      setError(null);
      try {
        const configData = await MedicalOfficeWebApi.getAllConfigurations();
        const workingHoursDto = configData.allConfigurations?.weeklyWorkingHours?.workingHoursDto || [];
        setWorkingHours(workingHoursDto);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkingHours();
  }, []);

  const handleDayChange = (e) => {
    const id = parseInt(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.updateLaboralDays(selectedDay, formData);
      setSuccess(true);
      setWorkingHours((prev) =>
        prev.map((day) =>
          day.id === selectedDay
            ? { ...day, laboral: formData.laboral, openingTime: formData.openingTime, closingTime: formData.closingTime }
            : day
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-100">
      {/* <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Actualizar Días Laborales
      </Typography> */}

      {loading && <Typography color="blue-gray">Cargando datos...</Typography>}
      {error && <Typography color="red">{error}</Typography>}

      <Card className="p-4 shadow-md">
        <Typography variant="h6" color="blue-gray" className="mb-4 font-bold">
          Seleccione un día para actualizar
        </Typography>
        <div className="relative w-full">
          <select
            id="day-select"
            name="day"
            value={selectedDay || ""}
            onChange={handleDayChange}
            className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md appearance-none outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          >
            <option value="" disabled>Selecciona un día</option>
            {workingHours.map((day) => (
              <option key={day.id} value={day.id}>{day.days}</option>
            ))}
          </select>
          <ChevronDownIcon
            className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2"
            aria-hidden="true"
          />
        </div>
      </Card>

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
