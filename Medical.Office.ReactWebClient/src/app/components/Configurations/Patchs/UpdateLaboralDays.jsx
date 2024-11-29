import React, { useState } from 'react';
import { Button, Input, Checkbox } from '@material-tailwind/react';

const UpdateLaboralDaysForm = ({ id }) => {
  // Estados para los campos del formulario
  const [laboral, setLaboral] = useState(false);
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      laboral,
      openingTime,
      closingTime,
    };

    try {
      const response = await fetch(`/api/UpdateLaboralDays/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Laboral day updated successfully:', result);
      } else {
        console.error('Error updating laboral day:', response.status);
      }
    } catch (error) {
      console.error('Error updating laboral day:', error);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Update Laboral Days</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Checkbox para indicar si es día laboral */}
        <div className="flex items-center">
          <Checkbox
            id="laboral"
            checked={laboral}
            onChange={(e) => setLaboral(e.target.checked)}
          />
          <label htmlFor="laboral" className="ml-2">Is Laboral Day</label>
        </div>

        {/* Input para la hora de apertura */}
        <Input
          label="Opening Time"
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          className="mt-2"
        />

        {/* Input para la hora de cierre */}
        <Input
          label="Closing Time"
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          className="mt-2"
        />

        {/* Botón de envío */}
        <Button type="submit" className="w-full mt-4" color="teal">
          Update Laboral Day
        </Button>
      </form>
    </div>
  );
};

export default UpdateLaboralDaysForm;
