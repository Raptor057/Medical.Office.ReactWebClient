import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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

const TABLE_HEAD = ["Nombre", "Rol", "Estado", "Fecha de Registro", ""];

const TABLE_ROWS = [
  {
    img: "https://via.placeholder.com/150",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    job: "Doctor",
    org: "Hospital General",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://via.placeholder.com/150",
    name: "Ana López",
    email: "ana.lopez@example.com",
    job: "Enfermera",
    org: "Clínica Familiar",
    online: false,
    date: "19/09/20",
  },
];

export function PatientsList() {
  return (
    <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h5" color="blue-gray">
            Lista de Pacientes
          </Typography>
          <Button className="flex items-center gap-2">
            <UserPlusIcon className="w-5 h-5" /> Agregar Paciente
          </Button>
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
            {TABLE_ROWS.map(
              ({ img, name, email, job, org, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={online ? "En línea" : "Desconectado"}
                        color={online ? "green" : "blue-gray"}
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Editar Paciente">
                        <IconButton variant="text">
                          <PencilIcon className="w-4 h-4" />
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
          Página 1 de 5
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Anterior
          </Button>
          <Button variant="outlined" size="sm">
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
