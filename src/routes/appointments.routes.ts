import {Router} from 'express'
import {parseISO} from 'date-fns'
const appointmentsRouter = Router()

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import Appointment from '../models/Appointments'
import CreateAppointmentService from '../services/CreateAppointmentService'

/*por enquanto o repostitório necessita ficar aqui uma vez que vai ser acessível por várias rotas
**não será possível instanciar um novo repositorio pra casa service do contrário vários repositórios
**seriam trabalhados ao mesmo tempo
*/
const appointmentsRepository = new AppointmentsRepository()

/*aqui rotas que dizem respeito a Appointments
**a rota abaixo vai ser chamada para localhost:3333/appointments/
**pois no arquivo routes/index.ts foi setado routes.use('appointments' appointmentsRouter)*/
appointmentsRouter.post('/', (request, response)=>{
    try{

        const {provider, date} = request.body
        const parsedDate = parseISO(date) // somente transformação de dados
        const createAppointmentService = new CreateAppointmentService(appointmentsRepository)
         
        const appointment = createAppointmentService.execute({provider,date: parsedDate})
        return response.json(appointment)
    }catch(error){
        return response.status(400).json({error: error.message})
    }
    
})

appointmentsRouter.get('/', (request, response)=>{
    const appointments = appointmentsRepository.all()
    return response.json(appointments)
})

export default appointmentsRouter