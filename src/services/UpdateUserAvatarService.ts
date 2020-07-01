import {getRepository} from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../models/User'
import UploadConfig from '../config/uploads'
import AppError from '../erros/AppError'


interface Request{
    user_id: string;
    avatarFileName: string;
}
class UpdateUserAvatarService{
    public async execute({user_id, avatarFileName}: Request): Promise<User>{
        const usersRepository = getRepository(User)
        const user =  await usersRepository.findOne(user_id)
        if(!user){
            throw new AppError('Only authenticated users can change avatar',401)
        }
        if(user.avatar){
            //deletar avatar
            const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar)
            const userAvatarFilePathExists = await fs.promises.stat(userAvatarFilePath) 
            if(userAvatarFilePathExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }
        user.avatar = avatarFileName
                    // .split(' ')
                    // .reduce((acu, elem)=>acu+elem,'')
        await  usersRepository.save(user)
        return user
    }
}

export default UpdateUserAvatarService