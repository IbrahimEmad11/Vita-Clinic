import type { LaboratoryTest, PriceLookup, Therapy } from './settings.type';
import type { PatientMedication } from './emr.type';

export type AppointmentStatus =
  | 'completed'
  | 'pending'
  | 'cancelled'
  | 'rejected'
  | 'approved';

export type Appointment = {
  id: string;
  number: number;
  date: string;
  doctorId?: string;
  patientId: string;
  electronicMedicalRecordId: string;
  status: AppointmentStatus;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Report = {
  id: string;
  appointmentId: string;
  title: string;
  status: 'initial' | 'processed' | 'failed';
  notes?: string;
  fileName: string;
  reportURL: string;
  createdAt: string;
};

export type Message = {
  id: string;
  reportId: string;
  message: string;
  isUserMessage: boolean;
  createdAt: string;
};

export type Scan = {
  id: string;
  appointmentId: string;
  title: string;
  notes: string;
  modality: PriceLookup;
  scanURLs: string[];
  createdAt: string;
};

export type Prescription = PatientMedication & {
  appointmentId: string;
};

export type Treatment = {
  id: string;
  appointmentId: string;
  name: string;
  dosage: number;
  duration: number;
  therapy: Therapy;
  response?: string;
  sideEffect?: string;
  notes?: string;
  createdAt: string;
};

export type BillingStatus = 'initial' | 'paid' | 'insurance';

export type Billing = {
  id: string;
  number: number;
  date: string;
  amount: number;
  status: BillingStatus;
};

export type Vitals = {
  id: string;
  temperature?: number;
  systolicBloodPressure?: number;
  diastolicBloodPressure?: number;
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentDetails = Appointment & {
  services: {
    service?: PriceLookup;
    therapy?: PriceLookup;
    scans: PriceLookup[];
    labWorks: LaboratoryTest[];
  };
  billing: Billing;
  vitals: Vitals;
};
