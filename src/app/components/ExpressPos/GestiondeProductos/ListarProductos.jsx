'use client';

import { useEffect, useState } from 'react';
//import ExpressPos from '@/app/utils/ExpressPos';
import ExpressPos from '@/app/utils/HttpRequestsExpressPos';

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ExpressPos.obtenerTodosLosProductos();
        setProductos(data);
        setFilteredProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al cargar los productos.');
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const results = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductos(results);
  }, [searchTerm, productos]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Listado de Productos</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        className="border rounded p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.length > 0 ? (
            filteredProductos.map((producto) => (
              <tr key={producto.productoID}>
                <td className="border p-2">{producto.productoID}</td>
                <td className="border p-2">{producto.nombre}</td>
                <td className="border p-2">{producto.precio.toFixed(2)}</td>
                <td className="border p-2">{producto.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="4">
                No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProductos;
