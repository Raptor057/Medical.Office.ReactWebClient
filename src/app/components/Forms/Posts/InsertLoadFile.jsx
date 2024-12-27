import React, { useState } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta para la instancia de API

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB por chunk

export default function UploadPatientFileForm({ patientId, description }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setProgress(0);
    setError(null);
    setSuccess(false);
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
    } catch (err) {
      setError(`Error al subir archivos: ${err.message}`);
    } finally {
      setLoading(false);
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

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

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
        >
          Subir Archivos
        </button>
      )}

      {success && <p className="text-green-600">¡Archivos subidos con éxito!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
