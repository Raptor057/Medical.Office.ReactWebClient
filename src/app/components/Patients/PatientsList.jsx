import React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";

const TABLE_HEAD = ["Nombre Completo", "Correo Electrónico", "Estado", "Fecha de Nacimiento", ""];

export function PatientsList({ patients = [] }) {
  return (
    <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between mb-8">
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
            {patients.map(
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
                const isLast = index === patients.length - 1;
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
                              ? `data:image/jpeg;base64,${photo}` // Mostrar imagen en Base64
                              : "https://via.placeholder.com/150" // Imagen por defecto
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
                            {`${name} ${fathersSurname} ${mothersSurname}`}
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
                      <Chip
                        variant="ghost"
                        size="sm"
                        value="Activo"
                        color="green"
                      />
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
                      <Tooltip content="Ver Historial Del Paciente">
                        <IconButton variant="text">
                          <EyeIcon className="w-4 h-4" />
                        </IconButton>
                      </Tooltip>
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
          Página 1 de 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outlined" size="sm" disabled>
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
