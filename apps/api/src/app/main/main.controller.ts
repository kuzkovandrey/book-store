import { MainService } from './main.service';
import { Controller, Get } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { BaseController } from '@core/base';

@Controller(ApiControlles.MAIN)
export class MainController extends BaseController {
  constructor(private mainService: MainService) {
    super(MainController.name);
  }

  @Get()
  async getMainPageSections() {
    return this.mainService.getMainPageSections();
  }
}
