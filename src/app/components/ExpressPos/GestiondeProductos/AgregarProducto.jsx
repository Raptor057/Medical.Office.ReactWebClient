'use client';

import React, { useState } from 'react';
//import { ExpressPos } from '@/app/utils/HttpRequests'; // Asegúrate de ajustar la ruta según tu estructura
import { ExpressPos } from '@/app/utils/HttpRequestsExpressPos';


const AgregarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const producto = { Nombre: nombre, Precio: parseFloat(precio), Stock: parseInt(stock, 10) };
            const response = await ExpressPos.agregarProducto(producto);

            setMessage(`Producto agregado correctamente con ID: ${response.id}`);
            setNombre('');
            setPrecio('');
            setStock('');
        } catch (error) {
            setMessage(`Error al agregar producto: ${error}`);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="precio" className="block text-gray-700 font-medium mb-2">
                        Precio
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Agregar Producto
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>
    );
};

export default AgregarProducto;
