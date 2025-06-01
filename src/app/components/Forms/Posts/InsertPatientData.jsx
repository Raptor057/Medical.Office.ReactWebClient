'use client';

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";
import Link from "next/link";
import { HomeIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function InsertPatientDataForm() {
  const [formData, setFormData] = useState({
    name: "", fathersSurname: "", mothersSurname: "", dateOfBirth: "", gender: "",
    address: "", country: "", city: "", state: "", zipCode: "", outsideNumber: "",
    insideNumber: "", phoneNumber: "", email: "", emergencyContactName: "",
    emergencyContactPhone: "", insuranceProvider: "", policyNumber: "",
    bloodType: "", photo: "", internalNotes: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [genders, setGenders] = useState([]);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await MedicalOfficeWebApi.getAllConfigurations();
        setGenders(response?.allConfigurations?.genders || []);
      } catch (err) {
        console.error("Error al obtener los géneros:", err);
      }
    };
    fetchGenders();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 25 * 1024 * 1024) {
      setError("El tamaño máximo permitido para la imagen es de 25 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFormData(prev => ({ ...prev, photo: reader.result.split(",")[1] }));
    reader.onerror = () => setError("Error al leer el archivo.");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(false);
    try {
      await MedicalOfficeWebApi.insertPatientData(formData);
      setSuccess(true);
      setFormData(Object.fromEntries(Object.keys(formData).map(k => [k, ""])));
    } catch (err) {
      setError(err.message || "Error al registrar el paciente.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { label: "General", value: "general" },
    { label: "Contacto", value: "contact" },
    { label: "Seguro", value: "insurance" },
    { label: "Notas y Foto", value: "notes" }
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full h-full max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <Link href="/home">
          <Button className="flex items-center gap-2" color="blue-gray">
            <HomeIcon className="w-5 h-5" /> Inicio
          </Button>
        </Link>
        <Typography variant="h4" className="font-bold text-center text-blue-gray-800">
          Registrar Nuevo Paciente
        </Typography>
      </div>

      <Tabs value={activeTab} className="mt-6">
        <TabsHeader>
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel value="general">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Apellido Paterno" name="fathersSurname" value={formData.fathersSurname} onChange={handleChange} required />
              <Input label="Apellido Materno" name="mothersSurname" value={formData.mothersSurname} onChange={handleChange} />
              <Input type="date" label="Fecha de Nacimiento" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              <div className="relative">
                <label htmlFor="gender" className="block mb-1 text-sm font-medium text-gray-700">Género</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="block w-full py-2 pl-3 pr-10 text-base text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                  <option value="">Seleccione género</option>
                  {genders.map((g, i) => (<option key={i} value={g.gender.trim()}>{g.gender.trim()}</option>))}
                </select>
                <ChevronDownIcon className="absolute w-5 h-5 text-gray-400 pointer-events-none top-9 right-3" />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="contact">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Teléfono" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              <Input label="Correo Electrónico" type="email" name="email" value={formData.email} onChange={handleChange} />
              <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
              <Input label="Ciudad" name="city" value={formData.city} onChange={handleChange} />
              <Input label="Estado" name="state" value={formData.state} onChange={handleChange} />
              <Input label="Código Postal" name="zipCode" value={formData.zipCode} onChange={handleChange} />
            </div>
          </TabPanel>

          <TabPanel value="insurance">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Proveedor de Seguro" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} />
              <Input label="Número de Póliza" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
              <Input label="Tipo de Sangre" name="bloodType" value={formData.bloodType} onChange={handleChange} />
            </div>
          </TabPanel>

          <TabPanel value="notes">
            <Textarea label="Notas Internas" name="internalNotes" value={formData.internalNotes} onChange={handleChange} />
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Foto del Paciente (máx 25MB)</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Paciente"}
        </Button>
      </div>

      {success && <Typography color="green" className="text-center">¡Paciente registrado con éxito!</Typography>}
      {error && <Typography color="red" className="text-center">{error}</Typography>}
    </form>
  );
}
