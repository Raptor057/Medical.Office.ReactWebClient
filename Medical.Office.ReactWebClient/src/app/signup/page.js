'use client';

import React, { useState, useEffect } from 'react';
import SimpleRegistrationForm from '../components/signup';
import { MedicalOfficeWebApi } from '../utils/HttpRequests';
import '../globals.css';

export default function SignupPage() {
  const [configurationsResponse, setConfigurationsResponse] = useState({
    getAllConfigurations: {
      getOfficeSetupDto: {
        nameOfOffice: "",
        address: "",
        openingTime: "00:00:00",
        closingTime: "00:00:00"
      },
      getPositionsDto: [],
      getRolesDto: [],
      getSpecialtiesDto: [],
      getGendersDto: [],
      getUserStatuesDto: []
    }
  });

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    MedicalOfficeWebApi.getConfig()
      .then((data) => {
        setConfigurationsResponse(data); // Actualiza el estado con la respuesta de configuración
      })
      .catch((error) => {
        alert("Error al cargar la configuración: " + error.message);
      });
  };

  

  return (
    <div className="centered-div">
      <SimpleRegistrationForm configurations={configurationsResponse} />
      {configurationsResponse.getAllConfigurations.getOfficeSetupDto.nameOfOffice && (
        <div>
          <h2>Bienvenido a, {configurationsResponse.getAllConfigurations.getOfficeSetupDto.nameOfOffice}</h2>
        </div>
      )}
      <style jsx>{`
        .centered-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 50px); /* Ajusta la altura para tener en cuenta el margen superior */
          margin-top: 50px; /* Añade un margen superior */
        }
      `}</style>
    </div>
  );
}
