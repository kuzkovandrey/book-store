import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';

import { ApiControlles, MainPageSection } from '@book-store/shared';
import { BaseController } from '@core/base';
import { MainService } from './main.service';

@Controller(ApiControlles.MAIN)
export class MainController extends BaseController {
  constructor(private mainService: MainService) {
    super(MainController.name);
  }

  @Get()
  async getMainPageSections(): Promise<MainPageSection[]> {
    return this.mainService.getMainPageSections();
  }

  @Get(ApiControlles.HEALTH_SERVICE)
  async checkServiceHealth(): Promise<boolean> {
    try {
      return await this.mainService.hasMinProductsCount();
    } catch {
      throw new ServiceUnavailableException();
    }
  }
}
