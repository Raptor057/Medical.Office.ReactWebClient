'use client';

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import HttpRequests from "@/app/utils/HttpRequests";

const PatientAdvancementEditModal = ({ advancement, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    concept: advancement.concept,
    quantity: advancement.quantity,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        concept: formData.concept,
        quantity: parseFloat(formData.quantity),
        active: true, // Conservamos activo al guardar cambios
      };
      const response = await HttpRequests.updatePatientAdvancement(
        advancement.id,
        payload
      );
      if (onUpdate) onUpdate(response.data.patientAdvancement);
      onClose();
    } catch (err) {
      setError("Error al actualizar el avance.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        concept: formData.concept,
        quantity: parseFloat(formData.quantity),
        active: false, // Establece active en false para borrado lógico
      };
      const response = await HttpRequests.updatePatientAdvancement(
        advancement.id,
        payload
      );
      if (onUpdate) onUpdate(response.data.patientAdvancement);
      onClose();
    } catch (err) {
      setError("Error al eliminar el avance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={true} size="lg" onClose={onClose}>
      <ModalHeader>
        <Typography variant="h6">Editar Avance del Paciente</Typography>
      </ModalHeader>
      <ModalBody className="flex flex-col gap-4">
        {error && (
          <Typography variant="small" color="red">
            {error}
          </Typography>
        )}
        <Input
          name="concept"
          label="Concepto"
          value={formData.concept}
          onChange={handleInputChange}
        />
        <Input
          name="quantity"
          label="Cantidad"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="blue" onClick={handleSave} disabled={loading}>
          Guardar Cambios
        </Button>
        <Button color="red" onClick={handleDelete} disabled={loading}>
          Borrar (Eliminar Lógicamente)
        </Button>
        <Button color="gray" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PatientAdvancementEditModal;
