import {isEqual} from 'date-fns'
import Appointment from '../models/Appointments'

interface CreateAppointmentDTO{
    provider: string;
    date: Date;
}

class AppointmentsRepository{
    private appointments: Appointment[];

    constructor(){
        this.appointments = []
    }
    
    public create({date,provider}: CreateAppointmentDTO): Appointment{
        const appointment = new Appointment({date, provider})
        this.appointments.push(appointment)
        return appointment
    }

    public all():Appointment[]{
        return this.appointments;
    }
    public findByDate(date: Date): Appointment | null{
        const finded = this.appointments.find(appointment=> isEqual(appointment.date, date))
        return finded || null   
    }
}

export default AppointmentsRepository