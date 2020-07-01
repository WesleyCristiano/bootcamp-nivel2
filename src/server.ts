//rodar a aplicação para se conectar com o banco de dados
import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import 'reflect-metadata'

import "./database"
import uploadConfig from './config/uploads'
import routes from './routes'
import AppError from "./erros/AppError"

const app = express()
const port = 3333;

app.use('/files', express.static(uploadConfig.directory))
app.use(express.json())

app.use(routes)
app.use((error: Error, request: Request, response: Response, next:NextFunction)=>{
    if(error instanceof AppError){
        
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message})
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})
app.listen(port, ()=>{
    console.log(`:rocket: servidor rodando na porta ${port}`);  
})