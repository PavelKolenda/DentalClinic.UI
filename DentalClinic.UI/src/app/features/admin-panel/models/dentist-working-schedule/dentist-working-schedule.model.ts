import {WorkingSchedule} from "../working-schedule/working-schedule.model";

export interface DentistWorkingScheduleModel {
  dentistName: string;
  dentistSurname: string;
  dentistPatronymic?: string;
  workingSchedule: WorkingSchedule[];
}
