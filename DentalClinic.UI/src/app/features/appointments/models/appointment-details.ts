import {Time} from "@angular/common";

export interface AppointmentDetails {
  appointmentId: number;
  dentistName: string;
  dentistSurname: string;
  dentistPatronymic?: string;
  dentistSpecialization: string;
  dentistCabinetNumber: number;
  patientName: string;
  patientSurname: string;
  patientPatronymic?: string;
  appointmentTime: Time;
  appointmentDate: Date;
}