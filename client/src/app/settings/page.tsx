import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DiagnosisTable from './_components/DiagnosisTable';
import MedicalConditionsTable from './_components/MedicalConditionsTable';
import AllergiesTable from './_components/AllergiesTable';
import MedicationsTable from './_components/MedicationsTable';
import SurgeriesTable from './_components/SurgeriesTable';
import ModalitiesTable from './_components/ModalitiesTable';
import BiomarksTable from './_components/BiomarksTable';
import LaboratoryTestsTable from './_components/LaboratoryTestsTable';

export default function SettingsPage() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold uppercase text-primary">
            Settings
          </h2>
          <h3 className="text-base text-muted-foreground">
            Manage your clinic settings
          </h3>
        </div>
        <Tabs defaultValue="diagnosis">
          <TabsList className="flex h-full w-fit flex-wrap justify-start gap-0.5">
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            <TabsTrigger value="medical-conditions">
              Medical Conditions
            </TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="surgeries">Surgeries</TabsTrigger>
            <TabsTrigger value="modalities">Modalities</TabsTrigger>
            <TabsTrigger value="biomarks">Biomarks</TabsTrigger>
            <TabsTrigger value="laboratory-tests">Laboratory Tests</TabsTrigger>
          </TabsList>
          <TabsContent value="diagnosis">
            <DiagnosisTable />
          </TabsContent>
          <TabsContent value="medical-conditions">
            <MedicalConditionsTable />
          </TabsContent>
          <TabsContent value="allergies">
            <AllergiesTable />
          </TabsContent>
          <TabsContent value="medications">
            <MedicationsTable />
          </TabsContent>
          <TabsContent value="surgeries">
            <SurgeriesTable />
          </TabsContent>
          <TabsContent value="modalities">
            <ModalitiesTable />
          </TabsContent>
          <TabsContent value="biomarks">
            <BiomarksTable />
          </TabsContent>
          <TabsContent value="laboratory-tests">
            <LaboratoryTestsTable />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
