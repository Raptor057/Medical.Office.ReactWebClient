// 'use client';

// import React, { useState, useEffect } from "react";
// import { Button, Input, Textarea, Typography, Select, Option } from "@material-tailwind/react";
// import Link from "next/link";
// import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

// export default function InsertPatientDataForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     fathersSurname: "",
//     mothersSurname: "",
//     dateOfBirth: "",
//     gender: "",
//     address: "",
//     country: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     outsideNumber: "",
//     insideNumber: "",
//     phoneNumber: "",
//     email: "",
//     emergencyContactName: "",
//     emergencyContactPhone: "",
//     insuranceProvider: "",
//     policyNumber: "",
//     bloodType: "",
//     photo: "",
//     internalNotes: "",
//   });

//   const [loading, setLoading] = useState(false); // Estado de carga
//   const [error, setError] = useState(null); // Estado para errores
//   const [success, setSuccess] = useState(false); // Estado para éxito
//   const [genders, setGenders] = useState([]); // Lista de géneros

//   useEffect(() => {
//     const fetchGenders = async () => {
//       try {
//         const response = await MedicalOfficeWebApi.getAllConfigurations();
//         const gendersData = response?.allConfigurations?.genders || [];
//         setGenders(gendersData);
//       } catch (err) {
//         console.error("Error al obtener los géneros:", err);
//       }
//     };
//     fetchGenders();
//   }, []);

//   // Manejo de cambios en los campos del formulario
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Manejo de cambios en el archivo de imagen
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       if (file.size > 25 * 1024 * 1024) { // Máximo 25 MB
//         setError("El tamaño máximo permitido para la imagen es de 25 MB.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prev) => ({ ...prev, photo: reader.result.split(",")[1] }));
//         setError(null); // Limpia cualquier error previo
//       };
//       reader.onerror = () => {
//         setError("Error al leer el archivo. Intente nuevamente.");
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Manejo del envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Llamada al endpoint
//       await MedicalOfficeWebApi.insertPatientData(formData);
//       setSuccess(true); // Mostrar mensaje de éxito
//       setFormData({
//         name: "",
//         fathersSurname: "",
//         mothersSurname: "",
//         dateOfBirth: "",
//         gender: "",
//         address: "",
//         country: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         outsideNumber: "",
//         insideNumber: "",
//         phoneNumber: "",
//         email: "",
//         emergencyContactName: "",
//         emergencyContactPhone: "",
//         insuranceProvider: "",
//         policyNumber: "",
//         bloodType: "",
//         photo: "",
//         internalNotes: "",
//       }); // Limpiar el formulario
//     } catch (err) {
//       setError(err.message || "Error al registrar el paciente. Intente nuevamente.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
//       <Typography variant="h4" color="blue-gray" className="font-bold text-center">
//         Registrar Nuevo Paciente
//       </Typography>
//       <Typography color="gray" className="text-sm font-normal text-center">
//         Completa la información del paciente para registrarlo.
//       </Typography>

//       {/* Campos del formulario */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
//         <Input
//           label="Apellido Paterno"
//           name="fathersSurname"
//           value={formData.fathersSurname}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           label="Apellido Materno"
//           name="mothersSurname"
//           value={formData.mothersSurname}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="date"
//           label="Fecha de Nacimiento"
//           name="dateOfBirth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//           required
//         />
//         <div>
//           <Typography variant="small" className="mb-2">
//             Género
//           </Typography>
//           <Select
//             value={formData.gender}
//             onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
//             required
//           >
//             {genders.map((gender, index) => (
//               <Option key={index} value={gender.gender.trim()}>
//                 {gender.gender.trim()}
//               </Option>
//             ))}
//           </Select>
//         </div>
//         <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
//         <Input label="País" name="country" value={formData.country} onChange={handleChange} />
//         <Input label="Ciudad" name="city" value={formData.city} onChange={handleChange} />
//         <Input label="Estado" name="state" value={formData.state} onChange={handleChange} />
//         <Input label="Código Postal" name="zipCode" value={formData.zipCode} onChange={handleChange} />
//         <Input
//           label="Número Exterior"
//           name="outsideNumber"
//           value={formData.outsideNumber}
//           onChange={handleChange}
//         />
//         <Input
//           label="Número Interior"
//           name="insideNumber"
//           value={formData.insideNumber}
//           onChange={handleChange}
//         />
//         <Input
//           label="Teléfono"
//           name="phoneNumber"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           label="Correo Electrónico"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <Input
//           label="Nombre del Contacto de Emergencia"
//           name="emergencyContactName"
//           value={formData.emergencyContactName}
//           onChange={handleChange}
//         />
//         <Input
//           label="Teléfono del Contacto de Emergencia"
//           name="emergencyContactPhone"
//           value={formData.emergencyContactPhone}
//           onChange={handleChange}
//         />
//         <Input
//           label="Proveedor de Seguro"
//           name="insuranceProvider"
//           value={formData.insuranceProvider}
//           onChange={handleChange}
//         />
//         <Input
//           label="Número de Póliza"
//           name="policyNumber"
//           value={formData.policyNumber}
//           onChange={handleChange}
//         />
//         <Input
//           label="Tipo de Sangre"
//           name="bloodType"
//           value={formData.bloodType}
//           onChange={handleChange}
//         />
//         <Textarea
//           label="Notas Internas"
//           name="internalNotes"
//           value={formData.internalNotes}
//           onChange={handleChange}
//           placeholder="Escribe aquí las notas internas..."
//         />
//         <div>
//           <Typography variant="small" className="mb-2">
//             Foto del Paciente (Máximo 25 MB)
//           </Typography>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>

//       {/* Botón de envío */}
//       <div className="flex justify-end">
//         <Button type="submit" color="blue" disabled={loading}>
//           {loading ? "Enviando..." : "Guardar Paciente"}
//         </Button>
//       </div>

//       {/* Mensajes de éxito o error */}
//       {success && <Typography color="green" className="mt-2">¡Paciente registrado con éxito!</Typography>}
//       {error && <Typography color="red" className="mt-2">{error}</Typography>}
//     </form>
//   );
// }

'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, Typography, Select, Option } from "@material-tailwind/react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function InsertPatientDataForm() {
  const [formData, setFormData] = useState({
    name: "",
    fathersSurname: "",
    mothersSurname: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    outsideNumber: "",
    insideNumber: "",
    phoneNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceProvider: "",
    policyNumber: "",
    bloodType: "",
    photo: "",
    internalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await MedicalOfficeWebApi.getAllConfigurations();
        const gendersData = response?.allConfigurations?.genders || [];
        setGenders(gendersData);
      } catch (err) {
        console.error("Error al obtener los géneros:", err);
      }
    };
    fetchGenders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setError("El tamaño máximo permitido para la imagen es de 25 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result.split(",")[1] }));
        setError(null);
      };
      reader.onerror = () => {
        setError("Error al leer el archivo. Intente nuevamente.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.insertPatientData(formData);
      setSuccess(true);
      setFormData({
        name: "",
        fathersSurname: "",
        mothersSurname: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        outsideNumber: "",
        insideNumber: "",
        phoneNumber: "",
        email: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        insuranceProvider: "",
        policyNumber: "",
        bloodType: "",
        photo: "",
        internalNotes: "",
      });
    } catch (err) {
      setError(err.message || "Error al registrar el paciente. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8 bg-white rounded-lg shadow-md">
      {/* Botón de regreso a inicio */}
      <Link href="/home">
        <Button className="flex items-center gap-2">
          <HomeIcon className="w-5 h-5" /> Inicio
        </Button>
      </Link>

      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Nuevo Paciente
      </Typography>

      {/* Información General */}
      <section>
        <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
          Información General
        </Typography>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Apellido Paterno" name="fathersSurname" value={formData.fathersSurname} onChange={handleChange} required />
          <Input label="Apellido Materno" name="mothersSurname" value={formData.mothersSurname} onChange={handleChange}  />
          <Input type="date" label="Fecha de Nacimiento" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          <div>
            <Typography variant="small" className="mb-2">Género</Typography>
              <Select
              value={formData.gender}
              
              onChange={(value) => {
                console.log("Valor seleccionado:", value);
                setFormData((prev) => ({ ...prev, gender: value }));
              }}
              >
            {genders.map((gender, index) => (
              <Option key={index} value={gender.gender.trim()}>
              {gender.gender.trim()}
              </Option>
            ))}
            </Select>

          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section>
        <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
          Información de Contacto
        </Typography>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Teléfono" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          <Input label="Correo Electrónico" type="email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
          <Input label="Ciudad" name="city" value={formData.city} onChange={handleChange} />
          <Input label="Estado" name="state" value={formData.state} onChange={handleChange} />
          <Input label="Código Postal" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </div>
      </section>

      {/* Información del Seguro */}
      <section>
        <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
          Información del Seguro
        </Typography>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Proveedor de Seguro" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} />
          <Input label="Número de Póliza" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
          <Input label="Tipo de Sangre" name="bloodType" value={formData.bloodType} onChange={handleChange} />
        </div>
      </section>

      {/* Notas y Foto */}
      <section>
        <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
          Notas y Foto
        </Typography>
        <div className="grid grid-cols-1 gap-4">
          <Textarea label="Notas Internas" name="internalNotes" value={formData.internalNotes} onChange={handleChange} placeholder="Escribe aquí las notas internas..." />
          <div>
            <Typography variant="small" className="mb-2">Foto del Paciente (Máximo 25 MB)</Typography>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Paciente"}
        </Button>
      </div>

      {success && <Typography color="green" className="mt-2">¡Paciente registrado con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
