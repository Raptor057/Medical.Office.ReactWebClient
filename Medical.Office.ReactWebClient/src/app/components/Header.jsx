import React from "react";

export default function Header() {
  return (
    <header className="text-white bg-blue-600 shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <h1 className="text-2xl font-bold">Medical Office</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="transition-colors hover:text-blue-200">
                Inicio
              </a>
            </li>
            <li>
              <a href="/profile" className="transition-colors hover:text-blue-200">
                Perfil
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
