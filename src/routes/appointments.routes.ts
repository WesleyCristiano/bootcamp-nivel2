import {Router} from 'express'
import {parseISO} from 'date-fns'
import {getCustomRepository} from 'typeorm'
const appointmentsRouter = Router()

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import  ensureAuthenticated from '../middlewares/ensureAuthenticated'
appointmentsRouter.use(ensureAuthenticated)

/*aqui rotas que dizem respeito a Appointments
**a rota abaixo vai ser chamada para localhost:3333/appointments/
**pois no arquivo routes/index.ts foi setado routes.use('appointments' appointmentsRouter)*/
appointmentsRouter.post('/', async (request, response)=>{

    const {provider_id, date} = request.body
    const parsedDate = parseISO(date) // somente transformação de dados
    const createAppointmentService = new CreateAppointmentService()
        
    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate})
    return response.json(appointment)
    
})

appointmentsRouter.get('/', async(request, response)=>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()
    return response.json(appointments)
})

export default appointmentsRouter