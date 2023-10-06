import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaroselController } from './carousel.controller';
import { Carousel, CarouselSchema } from './carousel.schema';
import { CarouselService } from './carousel.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carousel.name, schema: CarouselSchema },
    ]),
  ],
  controllers: [CaroselController],
  providers: [CarouselService],
})
export class CarouselModule {}
