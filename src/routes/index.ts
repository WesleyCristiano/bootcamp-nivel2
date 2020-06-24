//esse arquivo vai usar todas as rotas da aplicação
//a pasta routes vai possui apenas rotas, cada entidade vai possuir 
//um arquivo entity.routes.ts que contém as rotas da entidade

import {Router} from 'express'
import appointmentsRouter from './appointments.routes'
const routes = Router();

routes.use('/appointments', appointmentsRouter)


export default routes