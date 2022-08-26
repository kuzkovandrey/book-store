import { Module } from '@nestjs/common';
import { ProductsModule } from '@products/products.module';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  imports: [ProductsModule],
  providers: [MainService],
  controllers: [MainController],
})
export class MainModule {}
