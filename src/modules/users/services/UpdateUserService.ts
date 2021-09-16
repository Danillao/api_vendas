import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';


interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findByName(name);
    const user = await usersRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuario não encontrado');
    }

    if(userExists) {
      throw new AppError('Ja existe um Usuario com esses dados');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);

    return user;
  }
}


export default UpdateUserService;
