import React from "react";
import Link from "next/link"; // Para enrutamiento interno
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-screen w-full max-w-[18rem] p-4 shadow-xl bg-gradient-to-b from-blue-50 to-white">
      {/* Logo y encabezado */}
      <div className="p-4 mb-6 text-center border-b border-gray-200">
        <Typography variant="h5" color="blue-gray" className="font-bold">
          Medical Office
        </Typography>
        <Typography color="gray" className="text-sm font-normal">
          Sistema de Gestión
        </Typography>
      </div>

      <List>
        {/* Pacientes */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="p-3 border-b-0"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="w-5 h-5 text-blue-500" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-medium">
                Pacientes
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="hover:bg-blue-100">
                <Link href="/home/patients/insertpatient" className="flex w-full">
                  <ListItemPrefix>
                    <ChevronDownIcon strokeWidth={2} className="w-5 h-3" />
                  </ListItemPrefix>
                  Agregar Paciente
                </Link>
              </ListItem>
              <ListItem className="hover:bg-blue-100">
                <Link href="/home/patients/list" className="flex w-full">
                  <ListItemPrefix>
                    <ChevronDownIcon strokeWidth={2} className="w-5 h-3" />
                  </ListItemPrefix>
                  Lista de Pacientes
                </Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        {/* Perfil */}
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="p-3 border-b-0"
            >
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5 text-blue-500" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-medium">
                Perfil
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="hover:bg-blue-100">
                <Link href="/profile" className="flex w-full">
                  <ListItemPrefix>
                    <ChevronDownIcon strokeWidth={2} className="w-5 h-3" />
                  </ListItemPrefix>
                  Ver Perfil
                </Link>
              </ListItem>
              <ListItem className="hover:bg-blue-100">
                <Link href="/settings" className="flex w-full">
                  <ListItemPrefix>
                    <ChevronDownIcon strokeWidth={2} className="w-5 h-3" />
                  </ListItemPrefix>
                  Configuración
                </Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        {/* Configuración */}
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="p-3 border-b-0"
            >
              <ListItemPrefix>
                <Cog6ToothIcon className="w-5 h-5 text-blue-500" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-medium">
                Configuración
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="hover:bg-blue-100">
                <Link href="/configurations/office" className="flex w-full">
                  <ListItemPrefix>
                    <ChevronDownIcon strokeWidth={2} className="w-5 h-3" />
                  </ListItemPrefix>
                  Oficina
                </Link>
              </ListItem>
              <ListItem className="hover:bg-blue-100">
                <Link href="/configurations/roles" className="flex w-full">
                  <ListItemPrefix>
                    <ChevronDownIcon strokeWidth={2} className="w-5 h-3" />
                  </ListItemPrefix>
                  Roles y Permisos
                </Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        {/* Cerrar Sesión */}
        <ListItem className="cursor-pointer hover:bg-red-50">
          <ListItemPrefix>
            <PowerIcon className="w-5 h-5 text-red-500" />
          </ListItemPrefix>
          <Typography
            color="red"
            className="mr-auto font-medium"
            onClick={() => console.log("Cerrando sesión...")}
          >
          Cerrar Sesión
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
}

export default MultiLevelSidebar;
