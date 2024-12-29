'use client';

import React, { useState } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta para la instancia de API

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB por chunk
const MAX_FILE_SIZE = 1.8 * 1024 * 1024 * 1024; // 1.8 GB en bytes

export default function UploadPatientFileForm({ patientId }) {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState(""); // Nueva descripción
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progreso de subida
  const [downloadProgress, setDownloadProgress] = useState(0); // Progreso de descarga
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const oversizedFiles = selectedFiles.filter((file) => file.size > MAX_FILE_SIZE);

    if (oversizedFiles.length > 0) {
      setError(`El tamaño máximo permitido es de 1.8 GB. Por favor, selecciona archivos más pequeños.`);
      setFiles([]);
      return;
    }

    setFiles(selectedFiles);
    setProgress(0);
    setError(null);
    setSuccess(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const uploadFileChunk = async (file, chunk, chunkIndex, totalChunks) => {
    const base64String = await fileToBase64(chunk);

    const body = {
      idPatient: patientId,
      fileName: file.name,
      fileType: getFileTypeDescription(file),
      fileExtension: getFileExtension(file.name),
      description: description || "Sin descripción",
      fileData: base64String,
      chunkIndex: chunkIndex,
      totalChunks: totalChunks,
    };

    try {
      await MedicalOfficeWebApi.uploadPatientFile(body); // Llamada al API
    } catch (err) {
      throw new Error(`Error al subir el chunk ${chunkIndex + 1}: ${err}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("La descripción es obligatoria.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      for (const file of files) {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        for (let i = 0; i < totalChunks; i++) {
          const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
          await uploadFileChunk(file, chunk, i, totalChunks);

          setProgress(((i + 1) / totalChunks) * 100); // Actualiza el progreso
        }
      }
      setSuccess(true);

      // Limpia los datos después de la subida
      setFiles([]);
      setDescription("");
      setProgress(0);
    } catch (err) {
      setError(`Error al subir archivos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId) => {
    setDownloadProgress(0);
    try {
      const response = await MedicalOfficeWebApi.getFileById(patientId, fileId);
      const { fileData, fileName } = response;

      // Simular progreso de descarga
      for (let i = 0; i <= 100; i++) {
        setTimeout(() => setDownloadProgress(i), i * 10);
      }

      // Crear enlace para descargar
      const link = document.createElement("a");
      link.href = `data:application/octet-stream;base64,${fileData}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress(0); // Restablece el progreso después de descargar
    } catch (err) {
      setError(`Error al descargar el archivo: ${err.message}`);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // Eliminar el prefijo de datos
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const getFileTypeDescription = (file) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) return "Imagen";
    if (fileType.startsWith("video/")) return "Video";
    if (fileType === "application/pdf") return "Archivo PDF";
    if (fileType.startsWith("text/")) return "Archivo de texto";
    if (fileType === "application/zip") return "Archivo ZIP";
    return "Archivo desconocido";
  };

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h4 className="text-center text-xl font-bold">Subir Archivos del Paciente</h4>

      <label className="block text-sm font-medium text-gray-700">
        Tamaño máximo permitido: 1.8 GB
      </label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Agrega una descripción para el archivo"
        rows="3"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
      ></textarea>

      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {loading ? (
        <p className="text-blue-600">Cargando archivos...</p>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!files.length}
        >
          Subir Archivos
        </button>
      )}

      {downloadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${downloadProgress}%` }}
          ></div>
        </div>
      )}

      {success && <p className="text-green-600">¡Archivos subidos con éxito!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
