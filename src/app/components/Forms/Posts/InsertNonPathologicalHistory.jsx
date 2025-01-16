// import React, { useState, useEffect } from "react";
// import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";
// import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
// import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

// export default function InsertUpdateNonPathologicalHistoryForm() {
//   const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
//   const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

//   const [formData, setFormData] = useState({
//     idPatient: patientId,
//     physicalActivity: false,
//     smoking: false,
//     alcoholism: false,
//     substanceAbuse: false,
//     substanceAbuseData: "",
//     recentVaccination: false,
//     recentVaccinationData: "",
//     others: false,
//     othersData: "",
//   });

//   const [loading, setLoading] = useState(false); // Estado de carga
//   const [error, setError] = useState(null); // Estado para errores
//   const [success, setSuccess] = useState(false); // Estado para éxito
//   const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

//   // Obtener antecedentes no patológicos al cargar el componente
//   useEffect(() => {
//     const fetchNonPathologicalHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await MedicalOfficeWebApi.getNonPathologicalHistory(patientId);
//         if (response && response.nonPathologicalHistory) {
//           const { nonPathologicalHistory } = response;
//           setFormData({
//             idPatient: patientId,
//             physicalActivity: nonPathologicalHistory.physicalActivity || false,
//             smoking: nonPathologicalHistory.smoking || false,
//             alcoholism: nonPathologicalHistory.alcoholism || false,
//             substanceAbuse: nonPathologicalHistory.substanceAbuse || false,
//             substanceAbuseData: nonPathologicalHistory.substanceAbuseData || "",
//             recentVaccination: nonPathologicalHistory.recentVaccination || false,
//             recentVaccinationData: nonPathologicalHistory.recentVaccinationData || "",
//             others: nonPathologicalHistory.others || false,
//             othersData: nonPathologicalHistory.othersData || "",
//           });
//           setIsDataLoaded(true);
//         }
//       } catch (err) {
//         setError(err || "Error al obtener los antecedentes no patológicos.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (patientId) {
//       fetchNonPathologicalHistory();
//     }
//   }, [patientId]);

//   // Manejo de cambios en los campos del formulario
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Manejo del envío del formulario para insertar
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Llamada al endpoint para insertar
//       await MedicalOfficeWebApi.insertNonPathologicalHistory(formData);
//       setSuccess(true); // Mostrar mensaje de éxito
//     } catch (err) {
//       setError(err); // Mostrar el error capturado
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manejo del envío del formulario para actualizar
//   const handleUpdateSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Llamada al endpoint para actualizar
//       const updateData = {
//         physicalActivity: formData.physicalActivity,
//         smoking: formData.smoking,
//         alcoholism: formData.alcoholism,
//         substanceAbuse: formData.substanceAbuse,
//         substanceAbuseData: formData.substanceAbuseData,
//         recentVaccination: formData.recentVaccination,
//         recentVaccinationData: formData.recentVaccinationData,
//         others: formData.others,
//         othersData: formData.othersData,
//       };
//       await MedicalOfficeWebApi.updateNonPathologicalHistory(patientId, updateData);
//       setSuccess(true); // Mostrar mensaje de éxito
//     } catch (err) {
//       setError(err); // Mostrar el error capturado
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Formulario de Inserción */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
//         <Typography variant="h4" color="blue-gray" className="font-bold text-center">
//           Antecedentes No Patológicos
//         </Typography>
//         <Typography color="gray" className="text-sm font-normal text-center">
//           Completa o actualiza los antecedentes no patológicos del paciente.
//         </Typography>

//         {/* Campos de antecedentes no patológicos */}
//         <div className="space-y-4">
//           <Checkbox
//             label="Actividad Física"
//             name="physicalActivity"
//             checked={formData.physicalActivity}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Tabaquismo"
//             name="smoking"
//             checked={formData.smoking}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Alcoholismo"
//             name="alcoholism"
//             checked={formData.alcoholism}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Consumo de Sustancias"
//             name="substanceAbuse"
//             checked={formData.substanceAbuse}
//             onChange={handleChange}
//           />
//           {formData.substanceAbuse && (
//             <Textarea
//               label="Detalles del Consumo de Sustancias"
//               name="substanceAbuseData"
//               value={formData.substanceAbuseData}
//               onChange={handleChange}
//               placeholder="Escribe aquí los detalles del consumo de sustancias..."
//             />
//           )}
//           <Checkbox
//             label="Vacunación Reciente"
//             name="recentVaccination"
//             checked={formData.recentVaccination}
//             onChange={handleChange}
//           />
//           {formData.recentVaccination && (
//             <Textarea
//               label="Detalles de la Vacunación Reciente"
//               name="recentVaccinationData"
//               value={formData.recentVaccinationData}
//               onChange={handleChange}
//               placeholder="Escribe aquí los detalles de la vacunación reciente..."
//             />
//           )}
//           <Checkbox
//             label="Otros"
//             name="others"
//             checked={formData.others}
//             onChange={handleChange}
//           />
//           {formData.others && (
//             <Textarea
//               label="Detalles Adicionales"
//               name="othersData"
//               value={formData.othersData}
//               onChange={handleChange}
//               placeholder="Escribe aquí otros antecedentes no patológicos..."
//             />
//           )}
//         </div>

//         {/* Botones de envío */}
//         <div className="flex justify-between">
//           <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
//             {loading ? "Enviando..." : "Guardar Antecedentes"}
//           </Button>
//           <Button type="button" color="green" onClick={handleUpdateSubmit}>
//             {loading ? "Actualizando..." : "Actualizar Antecedentes"}
//           </Button>
//         </div>

//         {/* Mensajes de éxito o error */}
//         {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
//         {error && <Typography color="red" className="mt-2">{error}</Typography>}
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Radio, Button, Textarea, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertUpdateNonPathologicalHistoryForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
    physicalActivity: false,
    smoking: false,
    alcoholism: false,
    substanceAbuse: false,
    substanceAbuseData: "",
    recentVaccination: false,
    recentVaccinationData: "",
    others: false,
    othersData: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

  // Obtener antecedentes no patológicos al cargar el componente
  useEffect(() => {
    const fetchNonPathologicalHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getNonPathologicalHistory(patientId);
        if (response && response.nonPathologicalHistory) {
          const { nonPathologicalHistory } = response;
          setFormData({
            idPatient: patientId,
            physicalActivity: nonPathologicalHistory.physicalActivity || false,
            smoking: nonPathologicalHistory.smoking || false,
            alcoholism: nonPathologicalHistory.alcoholism || false,
            substanceAbuse: nonPathologicalHistory.substanceAbuse || false,
            substanceAbuseData: nonPathologicalHistory.substanceAbuseData || "",
            recentVaccination: nonPathologicalHistory.recentVaccination || false,
            recentVaccinationData: nonPathologicalHistory.recentVaccinationData || "",
            others: nonPathologicalHistory.others || false,
            othersData: nonPathologicalHistory.othersData || "",
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        setError(err || "Error al obtener los antecedentes no patológicos.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchNonPathologicalHistory();
    }
  }, [patientId]);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "true", // Convertir a booleano
    });
  };

  // Manejo del envío del formulario para insertar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint para insertar
      await MedicalOfficeWebApi.insertNonPathologicalHistory(formData);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  // Manejo del envío del formulario para actualizar
  const handleUpdateSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint para actualizar
      const updateData = {
        physicalActivity: formData.physicalActivity,
        smoking: formData.smoking,
        alcoholism: formData.alcoholism,
        substanceAbuse: formData.substanceAbuse,
        substanceAbuseData: formData.substanceAbuseData,
        recentVaccination: formData.recentVaccination,
        recentVaccinationData: formData.recentVaccinationData,
        others: formData.others,
        othersData: formData.othersData,
      };
      await MedicalOfficeWebApi.updateNonPathologicalHistory(patientId, updateData);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulario de Inserción */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
        <Typography variant="h4" color="blue-gray" className="font-bold text-center">
          Antecedentes No Patológicos
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Completa o actualiza los antecedentes no patológicos del paciente.
        </Typography>

        {/* Campos de antecedentes no patológicos */}
        <div className="space-y-4">
          {[
            { label: "Actividad Física", name: "physicalActivity" },
            { label: "Tabaquismo", name: "smoking" },
            { label: "Alcoholismo", name: "alcoholism" },
            { label: "Consumo de Sustancias", name: "substanceAbuse" },
            { label: "Vacunación Reciente", name: "recentVaccination" },
            { label: "Otros", name: "others" },
          ].map(({ label, name }) => (
            <div key={name} className="flex items-center gap-4">
              <Typography>{label}:</Typography>
              <Radio
                id={`${name}-yes`}
                name={name}
                label="Sí"
                value="true"
                checked={formData[name] === true}
                onChange={handleChange}
              />
              <Radio
                id={`${name}-no`}
                name={name}
                label="No"
                value="false"
                checked={formData[name] === false}
                onChange={handleChange}
              />
            </div>
          ))}

          {formData.substanceAbuse && (
            <Textarea
              label="Detalles del Consumo de Sustancias"
              name="substanceAbuseData"
              value={formData.substanceAbuseData}
              onChange={(e) => setFormData({ ...formData, substanceAbuseData: e.target.value })}
              placeholder="Escribe aquí los detalles del consumo de sustancias..."
            />
          )}

          {formData.recentVaccination && (
            <Textarea
              label="Detalles de la Vacunación Reciente"
              name="recentVaccinationData"
              value={formData.recentVaccinationData}
              onChange={(e) => setFormData({ ...formData, recentVaccinationData: e.target.value })}
              placeholder="Escribe aquí los detalles de la vacunación reciente..."
            />
          )}

          {formData.others && (
            <Textarea
              label="Detalles Adicionales"
              name="othersData"
              value={formData.othersData}
              onChange={(e) => setFormData({ ...formData, othersData: e.target.value })}
              placeholder="Escribe aquí otros antecedentes no patológicos..."
            />
          )}
        </div>

        {/* Botones de envío */}
        <div className="flex justify-between">
          <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
            {loading ? "Enviando..." : "Guardar Antecedentes"}
          </Button>
          <Button type="button" color="green" onClick={handleUpdateSubmit}>
            {loading ? "Actualizando..." : "Actualizar Antecedentes"}
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
        {error && <Typography color="red" className="mt-2">{error}</Typography>}
      </form>
    </div>
  );
}
