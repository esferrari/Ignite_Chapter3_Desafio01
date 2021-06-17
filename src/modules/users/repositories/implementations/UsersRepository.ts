import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({user_id}: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const id = user_id
    const user = await this.repository.findOneOrFail(id, { relations: ["games"]});

    return user;

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(`Select * from users order by first_name ASC`); // Complete usando raw query
  }

  async findUserByFullName({first_name,last_name,}: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query("SELECT * FROM users WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2)", [first_name, last_name]);
  }
}
