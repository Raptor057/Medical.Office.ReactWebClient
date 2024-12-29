'use client';

import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function PatientFilesList({ patientId }) {
  const [files, setFiles] = useState([]); // Lista de archivos
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores


  // Obtener la lista de archivos del paciente
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getPatientFiles(patientId, 0);
        setFiles(response?.patientFile || []);
      } catch (err) {
        setError(err?.message || "Error desconocido al cargar los archivos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [patientId]);

  // Manejo de la descarga del archivo
  const handleDownloadFile = async (file) => {
    try {
      const response = await MedicalOfficeWebApi.getPatientFiles(file.idPatient, file.id);
      const fileData = response?.patientFile?.fileData || null;

      if (!fileData) {
        console.error("Archivo vacío o no disponible");
        return;
      }

      // Crear un enlace para descargar el archivo
      const link = document.createElement("a");
      link.href = `data:application/octet-stream;base64,${fileData}`;
      link.download = `${file.fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error al descargar el archivo:", err);
    }
  };

  // Manejo del borrado del archivo
  const handleDeleteFile = async (file) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el archivo ${file.fileName}?`);
    if (!confirmDelete) return;

    try {
      await MedicalOfficeWebApi.deletePatientFile(file.idPatient, file.id);
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id));
      alert("Archivo eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar el archivo:", err);
      alert("Error al eliminar el archivo.");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Archivos del Paciente
      </Typography>

      {/* Mensajes de carga o error */}
      {loading && <Typography color="blue-gray">Cargando archivos...</Typography>}
      {error && (
        <Typography color="red">
          {typeof error === "string" ? error : "Ocurrió un error inesperado."}
        </Typography>
      )}

      {/* Lista de archivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <Card key={file.id} className="shadow-md">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="font-bold break-words">
                {file.fileName}
              </Typography>
              <Typography color="gray" className="break-words">
                <strong>Tipo:</strong> {file.fileType}
              </Typography>
              <Typography color="gray" className="break-words">
                <strong>Descripción:</strong> {file.description || "Sin descripción"}
              </Typography>
              <div className="flex gap-4 mt-4">
                <Button
                  color="blue"
                  onClick={() => handleDownloadFile(file)}
                >
                  Descargar
                </Button>
                <Button
                  color="red"
                  onClick={() => handleDeleteFile(file)}
                >
                  Eliminar
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
