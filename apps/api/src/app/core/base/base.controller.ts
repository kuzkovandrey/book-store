import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { IncorrectDataError, NotFountError } from '@core/values';

export abstract class BaseController {
  throwHttpExeption(error: unknown) {
    if (error instanceof NotFountError)
      throw new NotFoundException(error.message);

    if (error instanceof IncorrectDataError)
      throw new BadRequestException(error.message);

    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
