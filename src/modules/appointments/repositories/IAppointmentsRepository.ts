import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonth(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findAllInDay(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
