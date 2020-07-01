//esse arquivo vai usar todas as rotas da aplicação
//a pasta routes vai possui apenas rotas, cada entidade vai possuir 
//um arquivo entity.routes.ts que contém as rotas da entidade

import {Router} from 'express'

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionsRouter from '../routes/sessions.routes'
    
const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)



export default routes