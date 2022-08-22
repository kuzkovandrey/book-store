import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryController } from './controllers/delivery.controller';
import { DeliveryPointEntity } from './entities/delivery-point.entity';
import { DeliveryService } from './services/delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryPointEntity])],
  providers: [DeliveryService],
  controllers: [DeliveryController],
  exports: [],
})
export class OrdersModule {}
