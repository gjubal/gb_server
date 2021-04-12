import { v4 as uuid } from 'uuid';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appt => isEqual(appt.date, date) && appt.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findAllInMonth({
    provider_id,
    month,
    year,
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appt =>
        appt.provider_id === provider_id &&
        getMonth(appt.date) + 1 === month &&
        getYear(appt.date) === year,
    );

    return appointments;
  }

  public async findAllInDay({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appt =>
        appt.provider_id === provider_id &&
        getDate(appt.date) === day &&
        getMonth(appt.date) + 1 === month &&
        getYear(appt.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
