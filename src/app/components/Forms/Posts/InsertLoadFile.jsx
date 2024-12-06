import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsUploaded(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    // Lógica de carga del archivo (puedes implementar la subida a un servidor aquí)
    console.log("Archivo cargado:", selectedFile);
    setIsUploaded(true);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader
        floated={false}
        shadow={false}
        className="p-4 rounded-none bg-blue-gray-50"
      >
        <Typography variant="h5" color="blue-gray">
          Cargar Archivo
        </Typography>
        <Typography variant="small" color="gray" className="mt-1">
          Selecciona un archivo y súbelo.
        </Typography>
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex flex-col items-center gap-4">
          <Input
            type="file"
            onChange={handleFileChange}
            label="Seleccionar Archivo"
          />
          {selectedFile && (
            <Typography variant="small" color="blue-gray">
              Archivo seleccionado: <strong>{selectedFile.name}</strong>
            </Typography>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex justify-end p-4">
        <Button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Subir Archivo
        </Button>
        {isUploaded && (
          <Typography variant="small" color="green" className="ml-4">
            ¡Archivo subido con éxito!
          </Typography>
        )}
      </CardFooter>
    </Card>
  );
}
