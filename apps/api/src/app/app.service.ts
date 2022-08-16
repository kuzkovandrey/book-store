import { Injectable } from '@nestjs/common';
// import { Message } from '@book-store/api-interfaces';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }
}
