import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import {
  CreateDeliveryPointDto,
  ToggleDeliveryPointStateDto,
} from '@book-store/shared/dto';
import { DeliveryService } from '@orders/services/delivery.service';
import { DeliveryPointEntity } from '@orders/entities/delivery-point.entity';
import { BaseController } from '@core/base';

@Controller(ApiControlles.DELIVERY)
export class DeliveryController extends BaseController {
  constructor(private deliveryService: DeliveryService) {
    super(DeliveryController.name);
  }

  @Get('/')
  getAll(): Promise<DeliveryPointEntity[]> {
    return this.deliveryService.findAll();
  }

  @Post(ApiControlles.CREATE)
  async createBook(
    @Body() delivery: CreateDeliveryPointDto
  ): Promise<DeliveryPointEntity> {
    try {
      return await this.deliveryService.create(delivery);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Patch('/:id')
  async changeValues(
    @Param('id') id: number,
    @Body() changes: CreateDeliveryPointDto
  ) {
    try {
      return await this.deliveryService.changeValues(id, changes);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Patch(`${ApiControlles.TOGGLE_STATE}/:id`)
  async toggleSate(
    @Param('id') id: number,
    @Body() { isActive }: ToggleDeliveryPointStateDto
  ) {
    try {
      return await this.deliveryService.toggleState(id, isActive);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }
}
