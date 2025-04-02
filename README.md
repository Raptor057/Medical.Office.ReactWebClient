This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


- Run test static Page 
`npx serve out/`


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



¡Claro que sí! Aquí tienes un resumen detallado de lo que hicimos:

---

### **1. Identificación del Problema**
- **Problema:** Querías navegar desde una lista de pacientes a una página de detalles del paciente, pasando el `id` del paciente seleccionado para hacer una solicitud a tu API.
- **Error inicial:** Estabas usando rutas dinámicas con `[id].js`, pero tu implementación causaba errores como `404` o `NextRouter was not mounted`.
- **Causa del problema:** Había un mal manejo de las rutas dinámicas y del acceso a los parámetros en Next.js, además de la confusión entre `useRouter` y las rutas dinámicas.

---

### **2. Solución Implementada: Uso de `useSearchParams`**
Optamos por no usar rutas dinámicas (`[id].js`) y simplificamos la implementación pasando el `id` del paciente como un **parámetro de consulta** (`query`) en la URL. Aquí están los pasos que seguimos:

#### **a. Modificamos la URL del botón del ojo en la lista de pacientes**
Cambiamos la URL del botón en el componente `PatientsList` para que pase el `id` del paciente como un parámetro de consulta en lugar de usar rutas dinámicas. 

Código del botón:
```javascript
<Link href={`/home/patients/list/patienthistory?id=${id}`}>
  <IconButton variant="text">
    <EyeIcon className="w-4 h-4" />
  </IconButton>
</Link>
```
- El `id` se incluye como `?id=123` en la URL cuando se hace clic en el botón.

---

#### **b. Cambiamos la página de detalles del paciente para usar `useSearchParams`**
En lugar de usar rutas dinámicas, configuramos la página para leer el `id` del parámetro de consulta (`?id=123`) utilizando el hook `useSearchParams` proporcionado por Next.js 13+.

```javascript
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Hook para obtener parámetros de consulta
import { Typography } from '@material-tailwind/react';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';
import { PatientDetails } from '@/app/components/Patients/PatientDetails';

export default function PatientDetailsPage() {
  const searchParams = useSearchParams(); // Obtener parámetros de consulta
  const id = searchParams.get('id'); // Extraer el valor de "id" de la URL

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Evitar llamadas si no hay un ID

    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await MedicalOfficeWebApi.getPatientDataAndAntecedents(id); // Llamar a la API
        setPatientData(response.patientDataAndAntecedents);
      } catch (err) {
        console.error('Error al obtener los detalles del paciente:', err);
        setError(err.message || 'Error al cargar los detalles del paciente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  // Mostrar cargando
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="blue-gray">
          Cargando detalles del paciente...
        </Typography>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="red">
          {error}
        </Typography>
      </div>
    );
  }

  // Mostrar datos del paciente
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <PatientDetails patientData={patientData} />
    </div>
  );
}

```
#### **Por qué funciona `useSearchParams`:**
- `useSearchParams` es parte de `next/navigation`, diseñado para manejar parámetros de consulta en aplicaciones que usan React Server Components o entornos cliente.
- Es más seguro y sencillo para manejar parámetros de consulta en Next.js 13+.

---

#### **c. Comprobamos que todo funcionara**
1. Hicimos clic en el botón del ojo en la lista de pacientes, lo que redirigió a una URL como `/home/patients/list/patienthistory?id=123`.
2. El `id` fue leído desde los parámetros de consulta utilizando `useSearchParams`.
3. Se realizó una llamada a la API con ese `id`, y los datos del paciente se mostraron correctamente en la página de detalles.

---

### **3. Beneficios de esta Solución**
- **Simplicidad:** No necesitas rutas dinámicas. Todo se gestiona con parámetros de consulta (`query`).
- **Mantenibilidad:** Las URL son más claras (`?id=123`) y fáciles de manejar.
- **Compatibilidad:** `useSearchParams` funciona perfectamente con el enfoque cliente de Next.js 13+.

---

### **4. Qué Aprender**
1. **Cómo pasar datos entre páginas usando parámetros de consulta:**
   - Usar `Link` para añadir parámetros a la URL.
   - Usar `useSearchParams` para leer esos parámetros.

2. **Cómo interactuar con una API basándote en datos dinámicos:**
   - Leer un parámetro (`id`) desde la URL y usarlo en una solicitud `GET`.

3. **Evitar problemas comunes con rutas dinámicas:**
   - Rutas dinámicas requieren más configuración. Los parámetros de consulta son más sencillos y efectivos para casos simples.

---

### **Siguiente Paso**
Si quieres implementar navegación más compleja (como mantener datos mientras navegas), puedes explorar **Context API** o **Redux**. Pero para este caso, los parámetros de consulta son ideales. 


