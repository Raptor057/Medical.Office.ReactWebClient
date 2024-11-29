import React, { useState } from 'react';
import { Button, Input, Switch, Textarea } from '@material-tailwind/react';

const InsertPsychiatricHistoryForm = () => {
  // Estado para los campos del formulario
  const [familyHistory, setFamilyHistory] = useState(false);
  const [familyHistoryData, setFamilyHistoryData] = useState('');
  const [affectedAreas, setAffectedAreas] = useState('');
  const [pastAndCurrentTreatments, setPastAndCurrentTreatments] = useState('');
  const [familySocialSupport, setFamilySocialSupport] = useState(false);
  const [familySocialSupportData, setFamilySocialSupportData] = useState('');
  const [workLifeAspects, setWorkLifeAspects] = useState('');
  const [socialLifeAspects, setSocialLifeAspects] = useState('');
  const [authorityRelationship, setAuthorityRelationship] = useState('');
  const [impulseControl, setImpulseControl] = useState('');
  const [frustrationManagement, setFrustrationManagement] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      idPatient: 0, // Este valor debe ser asignado según el contexto de la aplicación
      familyHistory,
      familyHistoryData,
      affectedAreas,
      pastAndCurrentTreatments,
      familySocialSupport,
      familySocialSupportData,
      workLifeAspects,
      socialLifeAspects,
      authorityRelationship,
      impulseControl,
      frustrationManagement,
    };

    try {
      const response = await fetch('/api/insertpsychiatricHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
      } else {
        console.error('Error submitting form:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Insert Psychiatric History</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Switch
            label="Family History"
            checked={familyHistory}
            onChange={() => setFamilyHistory(!familyHistory)}
            color="teal"
          />
          {familyHistory && (
            <Textarea
              label="Family History Details"
              value={familyHistoryData}
              onChange={(e) => setFamilyHistoryData(e.target.value)}
              className="mt-2"
            />
          )}
        </div>

        <Input
          label="Affected Areas"
          value={affectedAreas}
          onChange={(e) => setAffectedAreas(e.target.value)}
          className="mt-2"
        />
        <Textarea
          label="Past and Current Treatments"
          value={pastAndCurrentTreatments}
          onChange={(e) => setPastAndCurrentTreatments(e.target.value)}
          className="mt-2"
        />

        <div>
          <Switch
            label="Family Social Support"
            checked={familySocialSupport}
            onChange={() => setFamilySocialSupport(!familySocialSupport)}
            color="teal"
          />
          {familySocialSupport && (
            <Textarea
              label="Family Social Support Details"
              value={familySocialSupportData}
              onChange={(e) => setFamilySocialSupportData(e.target.value)}
              className="mt-2"
            />
          )}
        </div>

        <Input
          label="Work Life Aspects"
          value={workLifeAspects}
          onChange={(e) => setWorkLifeAspects(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Social Life Aspects"
          value={socialLifeAspects}
          onChange={(e) => setSocialLifeAspects(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Authority Relationship"
          value={authorityRelationship}
          onChange={(e) => setAuthorityRelationship(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Impulse Control"
          value={impulseControl}
          onChange={(e) => setImpulseControl(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Frustration Management"
          value={frustrationManagement}
          onChange={(e) => setFrustrationManagement(e.target.value)}
          className="mt-2"
        />

        <Button type="submit" className="w-full mt-4" color="teal">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default InsertPsychiatricHistoryForm;
