'use client';

import React from "react";
import { Typography } from "@material-tailwind/react";
import RegisterUser from "@/app/components/Configurations/Posts/RegisterUser";
import UsersList from "@/app/components/Configurations/Gets/UsersList";

import {Button} from "@material-tailwind/react";
import Link from "next/link";
import {HomeIcon } from "@heroicons/react/24/solid";

export default function UsersConfiguration() {
  return (
    <div className="w-full min-h-screen flex flex-row justify-center items-stretch p-6 gap-6">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
      <Link href="/home">
            <Button className="flex items-center gap-2">
              <HomeIcon className="w-5 h-5" /> Inicio
            </Button>
          </Link>
        <Typography variant="h5" color="blue-gray" className="font-bold mb-4 text-center">
          Registrar Usuario
        </Typography>
        <RegisterUser />
      </div>

      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h5" color="blue-gray" className="font-bold mb-4 text-center">
          Lista de Usuarios
        </Typography>
        <UsersList />
      </div>
    </div>
  );
}
