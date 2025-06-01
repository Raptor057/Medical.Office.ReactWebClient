// 'use client';

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Input,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import HttpRequests from "@/app/utils/HttpRequests";

// const InsertPatientAdvancementModal = ({ open, onClose, patientId }) => {
//   const [concept, setConcept] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!concept.trim()) {
//       setError("El concepto no puede estar en blanco.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const payload = {
//         idPatient: patientId,
//         concept: concept.trim(),
//         quantity: parseFloat(quantity),
//       };
//       await HttpRequests.insertPatientAdvancement(payload);
//       window.location.reload();
//     } catch (err) {
//       console.error("Error insertando abono:", err);
//       setError("Error al insertar el abono.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} size="lg" onClose={onClose}>
//       <DialogHeader>
//         <Typography variant="h6">Agregar Abono</Typography>
//       </DialogHeader>
//       <DialogBody className="flex flex-col gap-4">
//         {error && (
//           <Typography variant="small" color="red">
//             {error}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <Input
//             label="Concepto"
//             value={concept}
//             onChange={(e) => setConcept(e.target.value)}
//           />
//           <Input
//             label="Cantidad"
//             type="number"
//             step="0.01"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//           <Button type="submit" disabled={loading}>
//             {loading ? "Guardando..." : "Guardar Abono"}
//           </Button>
//         </form>
//       </DialogBody>
//       <DialogFooter>
//         <Button color="gray" variant="text" onClick={onClose} disabled={loading}>
//           Cancelar
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// };

// export default InsertPatientAdvancementModal;
'use client';

import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import HttpRequests from "@/app/utils/HttpRequests";
import Ticket from "@/app/components/Ticket/Ticket"; // Importa el componente Ticket

const InsertPatientAdvancementModal = ({ open, onClose, patientId }) => {
  const [concept, setConcept] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!concept.trim() || !quantity.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        idPatient: patientId,
        concept: concept.trim(),
        quantity: parseFloat(quantity),
      };

      await HttpRequests.insertPatientAdvancement(payload);

      // Establecer datos del ticket para imprimir automáticamente
      setTicketData({
        businessName: "Tu negocio",
        address: "Tu dirección",
        phone: "Tu teléfono",
        items: [{
          name: payload.concept,
          quantity: 1,
          price: payload.quantity,
        }]
      });

    } catch (err) {
      console.error("Error insertando abono:", err);
      setError("Error al insertar el abono.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} size="lg" onClose={onClose}>
        <DialogHeader>
          <Typography variant="h6">Agregar Abono</Typography>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          {error && (
            <Typography variant="small" color="red">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Concepto"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              required
            />
            <Input
              label="Cantidad"
              type="number"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Abono"}
            </Button>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button color="gray" variant="text" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Renderiza el ticket sólo si se han insertado datos y debe imprimirse */}
      {ticketData && (
        <div style={{ display: "none" }}>
          <Ticket
            businessName={ticketData.businessName}
            address={ticketData.address}
            phone={ticketData.phone}
            items={ticketData.items}
          />
        </div>
      )}
    </>
  );
};

export default InsertPatientAdvancementModal;
