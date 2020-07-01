import {Router} from 'express'
import multer, { MulterError } from 'multer'

import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadedConfig from '../config/uploads'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()

const upload = multer(uploadedConfig) 
usersRouter.post('/', async (request, response)=>{

    const {name, email, password} = request.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({name, email, password})
    //delete user.password
    return response.json(user)
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),async (request, response)=>{
    
    const updateAvatar = new UpdateUserAvatarService()
    const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })
    delete user.password
    return response.json(user)

    
})

export default usersRouter