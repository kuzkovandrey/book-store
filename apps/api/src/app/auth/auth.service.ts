import { UsersService } from '../users/users.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from '@book-store/shared';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser({ login, password }: User): Promise<{ login: string }> {
    const user = await this.userService.getUser(login);
    const isValidPassword = await compare(password, user?.password);

    if (!user || !isValidPassword)
      throw new NotAcceptableException('Incorrent login of password');

    return {
      login: user.login,
    };
  }
}
