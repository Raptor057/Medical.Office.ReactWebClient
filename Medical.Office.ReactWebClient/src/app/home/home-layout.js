
// Importa el Sidebar
import { MultiLevelSidebar } from "../components/sidebar"; // Ajusta la ruta de tu sidebar
import { MembersTable } from "../components/Patients/PatientsList"; // Ajusta la ruta de tu archivo

// Este layout se aplicará solo a las páginas dentro de la carpeta 'home'
export default function HomeLayout({ children }) {
  return (
    <div className="grid grid-cols-12 grid-rows-[auto,1fr,auto] min-h-screen gap-0.5">
      {/* Header (Se puede personalizar o dejar vacío) */}

      <div className="col-span-12 col-start-1 bg-gray-100 p-4 shadow-md">
        {/* Aquí puedes agregar tu contenido del header */}

      </div>

      {/* Sidebar */}
      <div className="col-span-2 row-span-2 col-start-1 row-start-2 bg-gray-200 p-4 border-r border-gray-300 overflow-y-auto">
        <MultiLevelSidebar />
      </div>

      {/* Main Content (Miembros) */}
      <div className="col-span-10 row-span-2 col-start-3 row-start-2 bg-white p-4 overflow-y-auto">
        <MembersTable />
      </div>

      {/* Footer */}
      <div className="col-span-12 col-start-1 row-start-3 bg-gray-800 text-white p-4 text-center">

      </div>
    </div>
  );
}
