// 'use client';

// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardBody,
//   Input,
//   Button,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

// export default function DoctorsList() {
//   const [doctors, setDoctors] = useState([]); // Lista de doctores
//   const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor seleccionado para actualizar
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     specialty: "",
//     phoneNumber: "",
//     email: "",
//   }); // Datos del formulario de actualización
//   const [specialties, setSpecialties] = useState([]); // Especialidades
//   const [loading, setLoading] = useState(false); // Estado de carga
//   const [error, setError] = useState(null); // Estado de errores
//   const [success, setSuccess] = useState(false); // Estado de éxito
//   const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

//   // Obtener la lista de doctores y especialidades
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const doctorsData = await MedicalOfficeWebApi.getDoctors(0); // Obtener doctores
//         setDoctors(doctorsData?.doctors || []);

//         const configData = await MedicalOfficeWebApi.getAllConfigurations(); // Obtener especialidades
//         const specialtiesData = configData.allConfigurations?.specialties || [];
//         setSpecialties(specialtiesData);
//       } catch (err) {
//         setError(err?.message || "Error desconocido al cargar los datos."); // Capturar mensaje legible
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Manejo de cambios en los campos del formulario
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Validar campo de teléfono
//     if (name === "phoneNumber") {
//       const phoneRegex = /^[0-9+]*$/; // Solo números y símbolo '+'
//       if (!phoneRegex.test(value)) return; // Ignorar entrada no válida
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSpecialtyChange = (value) => {
//     setFormData({
//       ...formData,
//       specialty: value,
//     });
//   };

//   // Manejo de la selección de un doctor para actualizar
//   const handleUpdateClick = (doctor) => {
//     setSelectedDoctor(doctor.id); // Guardar el ID del doctor seleccionado
//     setFormData({
//       firstName: doctor.firstName,
//       lastName: doctor.lastName,
//       specialty: doctor.specialty,
//       phoneNumber: doctor.phoneNumber,
//       email: doctor.email,
//     }); // Prellenar el formulario
//     setSuccess(false);
//     setError(null);
//     setIsModalOpen(true); // Abrir el modal
//   };

//   // Manejo del envío del formulario de actualización
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       await MedicalOfficeWebApi.updateDoctor(selectedDoctor, formData); // Actualizar doctor
//       setSuccess(true);

//       // Actualizar la lista localmente
//       setDoctors((prevDoctors) =>
//         prevDoctors.map((doctor) =>
//           doctor.id === selectedDoctor ? { ...doctor, ...formData } : doctor
//         )
//       );

//       setIsModalOpen(false); // Cerrar el modal
//     } catch (err) {
//       setError(err|| "Error desconocido al actualizar el doctor."); // Capturar mensaje legible
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 space-y-6 bg-gray-100">
//       <Typography variant="h4" color="blue-gray" className="font-bold text-center">
//         Lista de Doctores
//       </Typography>

//       {/* Mensajes de carga o error */}
//       {loading && <Typography color="blue-gray">Cargando doctores...</Typography>}
//       {error && (
//         <Typography color="red">
//           {typeof error === "string" ? error : "Ocurrió un error inesperado."}
//         </Typography>
//       )}

//       {/* Lista de doctores */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {doctors.map((doctor) => (
//           <Card key={doctor.id} className="shadow-md">
//             <CardBody>
//               <Typography variant="h5" color="blue-gray" className="font-bold break-words">
//                 {doctor.firstName} {doctor.lastName}
//               </Typography>
//               <Typography color="gray" className="break-words">
//                 <strong>Especialidad:</strong> {doctor.specialty}
//               </Typography>
//               <Typography color="gray" className="break-words">
//                 <strong>Teléfono:</strong> {doctor.phoneNumber}
//               </Typography>
//               <Typography color="gray" className="break-words">
//                 <strong>Email:</strong> {doctor.email}
//               </Typography>
//               <Button
//                 color="blue"
//                 onClick={() => handleUpdateClick(doctor)}
//                 className="mt-4"
//               >
//                 Actualizar
//               </Button>
//             </CardBody>
//           </Card>
//         ))}
//       </div>

//       {/* Modal de actualización */}
//       <Dialog open={isModalOpen} handler={setIsModalOpen} size="lg">
//         <DialogHeader>
//           <Typography variant="h4" color="blue-gray">
//             Actualizar Doctor
//           </Typography>
//         </DialogHeader>
//         <DialogBody>
//           <form className="space-y-4">
//             <Input
//               label="Nombre"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               label="Apellido"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//             <div>
//               <Typography variant="small" className="mb-2">
//                 Especialidad
//               </Typography>
//               <Select
//                 value={formData.specialty}
//                 onChange={(value) => handleSpecialtyChange(value)}
//                 required
//               >
//                 {specialties.map((specialty, index) => (
//                   <Option key={index} value={specialty.specialty}>
//                     {specialty.specialty}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <Input
//               label="Teléfono"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               label="Correo Electrónico"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </form>
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             color="red"
//             onClick={() => setIsModalOpen(false)}
//             className="mr-2"
//           >
//             Cancelar
//           </Button>
//           <Button
//             color="green"
//             onClick={handleUpdateSubmit}
//             disabled={loading}
//           >
//             {loading ? "Guardando..." : "Guardar Cambios"}
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", specialty: "", phoneNumber: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const doctorsData = await MedicalOfficeWebApi.getDoctors(0);
        setDoctors(doctorsData?.doctors || []);
        const configData = await MedicalOfficeWebApi.getAllConfigurations();
        setSpecialties(configData.allConfigurations?.specialties || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = (doctor) => {
    setSelectedDoctor(doctor.id);
    setFormData(doctor);
    setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSpecialtyChange = (val) => setFormData({ ...formData, specialty: val });

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await MedicalOfficeWebApi.updateDoctor(selectedDoctor, formData);
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === selectedDoctor ? { ...doc, ...formData } : doc))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="py-24 bg-white md:py-32">
      <div className="grid grid-cols-1 gap-20 px-6 mx-auto max-w-7xl lg:px-8 xl:grid-cols-5">
        <div className="max-w-2xl xl:col-span-2">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 text-pretty sm:text-5xl">
            Nuestro equipo médico
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Profesionales dedicados a brindar atención de calidad. Conoce a nuestros doctores.
          </p>
        </div>
        <ul role="list" className="divide-y divide-gray-200 xl:col-span-3">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="flex flex-col gap-10 py-12 sm:flex-row">
              <img
                src={`https://ui-avatars.com/api/?name=${doctor.firstName}+${doctor.lastName}&background=random`}
                alt=""
                className="aspect-[4/5] w-40 flex-none rounded-2xl object-cover"
              />
              <div className="flex-auto max-w-xl">
                <h3 className="text-xl font-semibold text-gray-900">{doctor.firstName} {doctor.lastName}</h3>
                <p className="font-medium text-gray-600">{doctor.specialty}</p>
                <p className="mt-4 text-sm text-gray-600"><strong>Teléfono:</strong> {doctor.phoneNumber}</p>
                <p className="text-sm text-gray-600"><strong>Email:</strong> {doctor.email}</p>
                <div className="mt-6">
                  <Button color="blue" size="sm" onClick={() => handleUpdateClick(doctor)}>Actualizar</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} handler={setIsModalOpen} size="lg">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">Actualizar Doctor</Typography>
        </DialogHeader>
        <DialogBody>
          <form className="grid gap-4">
            <Input label="Nombre" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <div>
              <Typography variant="small" className="mb-2">Especialidad</Typography>
              <Select value={formData.specialty} onChange={handleSpecialtyChange} required>
                {specialties.map((s, i) => (
                  <Option key={i} value={s.specialty}>{s.specialty}</Option>
                ))}
              </Select>
            </div>
            <Input label="Teléfono" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            <Input label="Correo" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button color="green" onClick={handleUpdateSubmit}>Guardar</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
