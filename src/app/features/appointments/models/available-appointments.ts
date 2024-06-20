import {Appointment} from "./appointment";

export interface AvailableAppointments {
  dentistId: number;
  date: Date;
  availableAppointments: Appointment[];
  count: number;
}
