//https://www.hyperui.dev/components/application-ui/tables

import React from "react";

export function MembersTable() {
  return (
    <div className="flex justify-center py-4 overflow-x-auto">
      <table className="min-w-full text-sm bg-white border-collapse divide-y-2 divide-gray-200">
        <thead className="ltr:text-center rtl:text-right">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">ID</th>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Nombre</th>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Fecha de Nacimiento</th>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Genero</th>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Numero</th>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Correo</th>
            <th className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Ver Historial</th>
            <th className="px-4 py-2 border-b border-gray-200"></th>
          </tr>
        </thead>

        <tbody className="text-center divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">1</td>
            <td className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">Rogelio Arriaga Gonzalez</td>
            <td className="px-4 py-2 text-gray-700 border-b border-gray-200 whitespace-nowrap">24/05/1995</td>
            <td className="px-4 py-2 text-gray-700 border-b border-gray-200 whitespace-nowrap">Masculino</td>
            <td className="px-4 py-2 text-gray-700 border-b border-gray-200 whitespace-nowrap">8687979530</td>
            <td className="px-4 py-2 text-gray-700 border-b border-gray-200 whitespace-nowrap">rogelioarriaga@live.com.mx</td>
            <td className="px-4 py-2 border-b border-gray-200 whitespace-nowrap">
              <a
                href="#"
                className="inline-block px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Ver
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}