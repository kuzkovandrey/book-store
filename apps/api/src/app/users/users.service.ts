import { Injectable } from '@nestjs/common';

import { User } from './user.model';

@Injectable()
export class UsersService {
  async getUser(login: string): Promise<User> {
    //TODO: Create admin entity
    if (process.env.ADMIN_LOGIN !== login) return null;

    return {
      login: process.env.ADMIN_LOGIN,
      password: process.env.ADMIN_PASSWORD,
    };
  }
}
