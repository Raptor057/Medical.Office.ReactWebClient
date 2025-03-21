// 'use client';

// import React, { useState } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// import {
//   Card,
//   CardHeader,
//   Input,
//   Typography,
//   Button,
//   CardBody,
//   CardFooter,
//   Avatar,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";

// import Link from "next/link";
// import { EyeIcon, UserPlusIcon, CalendarDaysIcon, HomeIcon } from "@heroicons/react/24/solid";

// import ScheduleAppointment from "@/app/components/Forms/Posts/ScheduleAppointment";
// import InsertPatientAdvancementModal from "@/app/components/Patients/InsertPatientAdvancementModal";


// const TABLE_HEAD = [
//   "Nombre Completo",
//   "Número de Teléfono",
//   "Fecha de Nacimiento",
//   "Acciones",
// ];

// export function PatientsList({ patients = [] }) {
//   const [query, setQuery] = useState("");
//   const [filteredPatients, setFilteredPatients] = useState(patients);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);
//   const itemsPerPage = 50;

//   const handleSearch = (event) => {
//     const searchQuery = event.target.value.toLowerCase();
//     setQuery(searchQuery);

//     const filtered = patients.filter(({ name, fathersSurname, mothersSurname, email }) =>
//       `${name || ""} ${fathersSurname || ""} ${mothersSurname || ""}`
//         .toLowerCase()
//         .includes(searchQuery) || (email ? email.toLowerCase().includes(searchQuery) : false)
//     );

//     setFilteredPatients(filtered);
//     setCurrentPage(1);
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedPatients = filteredPatients.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

//   const handleScheduleAppointment = (patientId) => {
//     setSelectedPatientId(patientId);
//     setAppointmentModalOpen(true);
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader floated={false} shadow={false} className="rounded-none">
//         <div className="flex items-center justify-between mb-8">
//         <Link href="/home">
//             <Button className="flex items-center gap-2">
//               <HomeIcon className="w-5 h-5" /> Inicio
//             </Button>
//           </Link>
//           <Typography variant="h5" color="blue-gray">
//             Lista de Pacientes
//           </Typography>
//           <Link href="/home/patients/insertpatient">
//             <Button className="flex items-center gap-2">
//               <UserPlusIcon className="w-5 h-5" /> Agregar Paciente
//             </Button>
//           </Link>
//         </div>
//         <div className="flex items-center gap-4">
//           <Input
//             label="Buscar"
//             icon={<MagnifyingGlassIcon className="w-5 h-5" />}
//             value={query}
//             onChange={handleSearch}
//           />
//         </div>
//       </CardHeader>
//       <CardBody className="px-0 overflow-scroll">
//         <table className="w-full text-left table-auto min-w-max">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head}
//                   className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal leading-none opacity-70"
//                   >
//                     {head}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedPatients.map(
//               (
//                 {
//                   id,
//                   name,
//                   fathersSurname,
//                   mothersSurname,
//                   email,
//                   dateOfBirth,
//                   phoneNumber,
//                   photo,
//                 },
//                 index
//               ) => {
//                 const isLast = index === paginatedPatients.length - 1;
//                 const classes = isLast
//                   ? "p-4"
//                   : "p-4 border-b border-blue-gray-50";

//                 return (
//                   <tr key={id}>
//                     <td className={classes}>
//                       <div className="flex items-center gap-3">
//                         <Avatar
//                           src={
//                             photo
//                               ? `data:image/jpeg;base64,${photo}`
//                               : "https://via.placeholder.com/150"
//                           }
//                           alt={`${name} ${fathersSurname}`}
//                           size="sm"
//                           variant="circular"
//                         />
//                         <div className="flex flex-col">
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {`${name || ""} ${fathersSurname || ""} ${
//                               mothersSurname || ""
//                             }`}
//                           </Typography>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal opacity-70"
//                           >
//                             {email || "Sin correo registrado"}
//                           </Typography>
//                         </div>
//                       </div>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {phoneNumber || "Sin teléfono registrado"}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {new Date(dateOfBirth).toLocaleDateString("es-MX", {
//                           day: "2-digit",
//                           month: "2-digit",
//                           year: "numeric",
//                         })}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <div className="flex items-center gap-2">
//                         <Tooltip content="Ver Historial Del Paciente">
//                           <Link
//                             href={{
//                               pathname: "/home/patients/list/patienthistory",
//                               query: { id },
//                             }}
//                           >
//                             <IconButton variant="text">
//                               <EyeIcon className="w-4 h-4" />
//                             </IconButton>
//                           </Link>
//                         </Tooltip>
//                         <Tooltip content="Agendar Cita">
//                           <IconButton
//                             variant="text"
//                             onClick={() => handleScheduleAppointment(id)}
//                           >
//                             <CalendarDaysIcon className="w-4 h-4" />
//                           </IconButton>
//                         </Tooltip>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               }
//             )}
//           </tbody>
//         </table>
//       </CardBody>
//       <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
//         <Typography variant="small" color="blue-gray" className="font-normal">
//           Página {currentPage} de {totalPages}
//         </Typography>
//         <div className="flex gap-2">
//           <Button
//             variant="outlined"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             Anterior
//           </Button>
//           <Button
//             variant="outlined"
//             size="sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Siguiente
//           </Button>
//         </div>
//       </CardFooter>

//       <ScheduleAppointment
//         open={appointmentModalOpen}
//         onClose={() => setAppointmentModalOpen(false)}
//         patientId={selectedPatientId}
//       />
//     </Card>
//   );
// }

'use client';

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  // Importa también Dialog si se usa en otro componente, pero en este archivo no lo necesitamos.
} from "@material-tailwind/react";

import Link from "next/link";
import { EyeIcon, UserPlusIcon, CalendarDaysIcon, HomeIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

import ScheduleAppointment from "@/app/components/Forms/Posts/ScheduleAppointment";
import InsertPatientAdvancementModal from "@/app/components/Patients/InsertPatientAdvancementModal";

const TABLE_HEAD = [
  "Nombre Completo",
  "Número de Teléfono",
  "Fecha de Nacimiento",
  "Acciones",
];

export function PatientsList({ patients = [] }) {
  const [query, setQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  // Estados para el modal de abono
  const [advancementModalOpen, setAdvancementModalOpen] = useState(false);
  const [selectedPatientForAdvancement, setSelectedPatientForAdvancement] = useState(null);

  const itemsPerPage = 50;

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    const filtered = patients.filter(({ name, fathersSurname, mothersSurname, email }) =>
      `${name || ""} ${fathersSurname || ""} ${mothersSurname || ""}`
        .toLowerCase()
        .includes(searchQuery) || (email ? email.toLowerCase().includes(searchQuery) : false)
    );

    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const handleScheduleAppointment = (patientId) => {
    setSelectedPatientId(patientId);
    setAppointmentModalOpen(true);
  };

  const handleInsertAdvancement = (patientId) => {
    setSelectedPatientForAdvancement(patientId);
    setAdvancementModalOpen(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between mb-8">
            <Link href="/home">
              <Button className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5" /> Inicio
              </Button>
            </Link>
            <Typography variant="h5" color="blue-gray">
              Lista de Pacientes
            </Typography>
            <Link href="/home/patients/insertpatient">
              <Button className="flex items-center gap-2">
                <UserPlusIcon className="w-5 h-5" /> Agregar Paciente
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Input
              label="Buscar"
              icon={<MagnifyingGlassIcon className="w-5 h-5" />}
              value={query}
              onChange={handleSearch}
            />
          </div>
        </CardHeader>
        <CardBody className="px-0 overflow-scroll">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map(
                (
                  {
                    id,
                    name,
                    fathersSurname,
                    mothersSurname,
                    email,
                    dateOfBirth,
                    phoneNumber,
                    photo,
                  },
                  index
                ) => {
                  const isLast = index === paginatedPatients.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              photo
                                ? `data:image/jpeg;base64,${photo}`
                                : "https://via.placeholder.com/150"
                            }
                            alt={`${name} ${fathersSurname}`}
                            size="sm"
                            variant="circular"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {`${name || ""} ${fathersSurname || ""} ${mothersSurname || ""}`}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email || "Sin correo registrado"}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phoneNumber || "Sin teléfono registrado"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(dateOfBirth).toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-2">
                          <Tooltip content="Ver Historial Del Paciente">
                            <Link
                              href={{
                                pathname: "/home/patients/list/patienthistory",
                                query: { id },
                              }}
                            >
                              <IconButton variant="text">
                                <EyeIcon className="w-4 h-4" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip content="Agendar Cita">
                            <IconButton
                              variant="text"
                              onClick={() => handleScheduleAppointment(id)}
                            >
                              <CalendarDaysIcon className="w-4 h-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Agregar Abono">
                            <IconButton
                              variant="text"
                              onClick={() => handleInsertAdvancement(id)}
                            >
                              <CurrencyDollarIcon className="w-4 h-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página {currentPage} de {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Siguiente
            </Button>
          </div>
        </CardFooter>

        <ScheduleAppointment
          open={appointmentModalOpen}
          onClose={() => setAppointmentModalOpen(false)}
          patientId={selectedPatientId}
        />
      </Card>

      {advancementModalOpen && (
        <InsertPatientAdvancementModal
          open={advancementModalOpen}
          onClose={() => setAdvancementModalOpen(false)}
          patientId={selectedPatientForAdvancement}
        />
      )}
    </>
  );
}
