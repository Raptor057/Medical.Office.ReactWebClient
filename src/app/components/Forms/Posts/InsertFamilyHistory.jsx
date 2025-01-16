// import React, { useState, useEffect } from "react";
// import { Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";
// import { useSearchParams } from "next/navigation"; // Hook de Next.js para obtener parámetros de la URL
// import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Importa la instancia de API

// export default function InsertUpdateFamilyHistoryForm() {
//   const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
//   const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

//   const [formData, setFormData] = useState({
//     idPatient: patientId,
//     diabetes: false,
//     cardiopathies: false,
//     hypertension: false,
//     thyroidDiseases: false,
//     chronicKidneyDisease: false,
//     others: false,
//     othersData: "",
//   });

//   const [loading, setLoading] = useState(false); // Estado de carga
//   const [error, setError] = useState(null); // Estado para errores
//   const [success, setSuccess] = useState(false); // Estado para éxito
//   const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

//   // Obtener el historial familiar al cargar el componente
//   useEffect(() => {
//     const fetchFamilyHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await MedicalOfficeWebApi.getFamilyHistory(patientId);
//         if (response && response.familyHistoryDto) {
//           const { familyHistoryDto } = response;
//           setFormData({
//             idPatient: patientId,
//             diabetes: familyHistoryDto.diabetes || false,
//             cardiopathies: familyHistoryDto.cardiopathies || false,
//             hypertension: familyHistoryDto.hypertension || false,
//             thyroidDiseases: familyHistoryDto.thyroidDiseases || false,
//             chronicKidneyDisease: familyHistoryDto.chronicKidneyDisease || false,
//             others: familyHistoryDto.others || false,
//             othersData: familyHistoryDto.othersData || "",
//           });
//           setIsDataLoaded(true);
//         }
//       } catch (err) {
//         setError(err || "Error al obtener el historial familiar.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (patientId) {
//       fetchFamilyHistory();
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

//   // Manejo del envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Llamada al endpoint para insertar
//       await MedicalOfficeWebApi.insertFamilyHistory(formData);
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
//         diabetes: formData.diabetes,
//         cardiopathies: formData.cardiopathies,
//         hypertension: formData.hypertension,
//         thyroidDiseases: formData.thyroidDiseases,
//         chronicKidneyDisease: formData.chronicKidneyDisease,
//         others: formData.others,
//         othersData: formData.othersData,
//       };
//       await MedicalOfficeWebApi.updateFamilyHistory(patientId, updateData);
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
//           Historial Familiar
//         </Typography>
//         <Typography color="gray" className="text-sm font-normal text-center">
//           Completa o actualiza los antecedentes médicos familiares del paciente.
//         </Typography>

//         {/* Opciones del historial familiar */}
//         <div className="space-y-4">
//           <Checkbox
//             label="Diabetes"
//             name="diabetes"
//             checked={formData.diabetes}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Cardiopatías"
//             name="cardiopathies"
//             checked={formData.cardiopathies}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Hipertensión"
//             name="hypertension"
//             checked={formData.hypertension}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Enfermedades de Tiroides"
//             name="thyroidDiseases"
//             checked={formData.thyroidDiseases}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Enfermedad Renal Crónica"
//             name="chronicKidneyDisease"
//             checked={formData.chronicKidneyDisease}
//             onChange={handleChange}
//           />
//           <Checkbox
//             label="Otras"
//             name="others"
//             checked={formData.others}
//             onChange={handleChange}
//           />
//           {formData.others && (
//             <Textarea
//               label="Detalles adicionales"
//               name="othersData"
//               value={formData.othersData}
//               onChange={handleChange}
//               placeholder="Escribe aquí otros antecedentes familiares..."
//             />
//           )}
//         </div>

//         {/* Botones de envío */}
//         <div className="flex justify-between">
//           <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
//             {loading ? "Enviando..." : "Guardar Historial"}
//           </Button>
//           <Button type="button" color="green" onClick={handleUpdateSubmit}>
//             {loading ? "Actualizando..." : "Actualizar Historial"}
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
import { useSearchParams } from "next/navigation"; // Hook de Next.js para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Importa la instancia de API

export default function InsertUpdateFamilyHistoryForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
    diabetes: false,
    cardiopathies: false,
    hypertension: false,
    thyroidDiseases: false,
    chronicKidneyDisease: false,
    others: false,
    othersData: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

  // Obtener el historial familiar al cargar el componente
  useEffect(() => {
    const fetchFamilyHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getFamilyHistory(patientId);
        if (response && response.familyHistoryDto) {
          const { familyHistoryDto } = response;
          setFormData({
            idPatient: patientId,
            diabetes: familyHistoryDto.diabetes || false,
            cardiopathies: familyHistoryDto.cardiopathies || false,
            hypertension: familyHistoryDto.hypertension || false,
            thyroidDiseases: familyHistoryDto.thyroidDiseases || false,
            chronicKidneyDisease: familyHistoryDto.chronicKidneyDisease || false,
            others: familyHistoryDto.others || false,
            othersData: familyHistoryDto.othersData || "",
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        setError(err || "Error al obtener el historial familiar.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchFamilyHistory();
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

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint para insertar
      await MedicalOfficeWebApi.insertFamilyHistory(formData);
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
        diabetes: formData.diabetes,
        cardiopathies: formData.cardiopathies,
        hypertension: formData.hypertension,
        thyroidDiseases: formData.thyroidDiseases,
        chronicKidneyDisease: formData.chronicKidneyDisease,
        others: formData.others,
        othersData: formData.othersData,
      };
      await MedicalOfficeWebApi.updateFamilyHistory(patientId, updateData);
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
          Historial Familiar
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Completa o actualiza los antecedentes médicos familiares del paciente.
        </Typography>

        {/* Opciones del historial familiar */}
        <div className="space-y-4">
          {[
            { label: "Diabetes", name: "diabetes" },
            { label: "Cardiopatías", name: "cardiopathies" },
            { label: "Hipertensión", name: "hypertension" },
            { label: "Enfermedades de Tiroides", name: "thyroidDiseases" },
            { label: "Enfermedad Renal Crónica", name: "chronicKidneyDisease" },
            { label: "Otras", name: "others" },
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

          {formData.others && (
            <Textarea
              label="Detalles adicionales"
              name="othersData"
              value={formData.othersData}
              onChange={(e) => setFormData({ ...formData, othersData: e.target.value })}
              placeholder="Escribe aquí otros antecedentes familiares..."
            />
          )}
        </div>

        {/* Botones de envío */}
        <div className="flex justify-between">
          <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
            {loading ? "Enviando..." : "Guardar Historial"}
          </Button>
          <Button type="button" color="green" onClick={handleUpdateSubmit}>
            {loading ? "Actualizando..." : "Actualizar Historial"}
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
        {error && <Typography color="red" className="mt-2">{error}</Typography>}
      </form>
    </div>
  );
}
