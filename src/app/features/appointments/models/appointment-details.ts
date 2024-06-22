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
  appointmentTime: string;
  appointmentDate: Date;
  dentistId: number;
  patientId: number;
}
