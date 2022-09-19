import { UsersService } from '../users/users.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from '../users/user.model';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser({ login, password }: User): Promise<string | null> {
    const user = await this.userService.getUser(login);
    const isValidPassword = await compare(user?.password, password);

    if (!user || !isValidPassword)
      throw new NotAcceptableException('Incorrent login of password');

    return user.login;
  }
}
