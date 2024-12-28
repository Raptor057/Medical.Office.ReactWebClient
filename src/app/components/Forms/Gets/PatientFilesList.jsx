'use client';

import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function PatientFilesList({ patientId }) {
  const [files, setFiles] = useState([]); // Lista de archivos
  const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado para ver
  const [fileContent, setFileContent] = useState(null); // Contenido del archivo en base64
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

  // Obtener la lista de archivos del paciente
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getPatientFiles(patientId,0);
        setFiles(response?.patientFile || []);
      } catch (err) {
        setError(err?.message || "Error desconocido al cargar los archivos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [patientId]);

  // Manejo de la visualización del archivo
  const handleViewFile = async (file) => {
    setSelectedFile(file);
    setFileContent(null);
    setIsModalOpen(true);

    try {
      const response = await MedicalOfficeWebApi.getPatientFiles(file.idPatient, file.id);
      setFileContent(response?.patientFile?.fileData || "");
    } catch (err) {
      console.error("Error al obtener el archivo:", err);
      setFileContent("Error al cargar el archivo.");
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
              <Button
                color="green"
                onClick={() => handleViewFile(file)}
                className="mt-4"
              >
                Ver
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal de visualización de archivos */}
      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)} size="lg">
        <DialogHeader>Visualización de Archivo</DialogHeader>
        <DialogBody>
          {selectedFile?.fileExtension === "pdf" ? (
            <iframe
              src={`data:application/pdf;base64,${fileContent}`}
              title={selectedFile?.fileName}
              className="w-full h-96"
            ></iframe>
          ) : selectedFile?.fileType === "Imagen" ? (
            <img
              src={`data:image/${selectedFile.fileExtension};base64,${fileContent}`}
              alt={selectedFile?.fileName}
              className="w-full h-auto"
            />
          ) : (
            <Typography variant="small" color="red">
              No se puede previsualizar este tipo de archivo.
            </Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setIsModalOpen(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
