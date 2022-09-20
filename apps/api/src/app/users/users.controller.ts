import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { BaseController } from '@core/base';
import { User } from '@book-store/shared';
import { LoginAuthGuard } from '../auth/login-auth.guard';

@Controller(ApiControlles.USER)
export class UsersController extends BaseController {
  @UseGuards(LoginAuthGuard)
  @Post(ApiControlles.LOGIN)
  async login(@Request() req: { user: User }) {
    return req.user;
  }

  @Get(ApiControlles.LOGOUT)
  logout(@Request() req: any) {
    req.session.destroy();
    return true;
  }
}
