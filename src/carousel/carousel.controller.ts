import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Carousel } from './carousel.schema';
import { CarouselService } from './carousel.service';
import { CarouselCreateDto } from './dto/carousel.dto';

@ApiTags('Carousel')
@Controller('carousel')
export class CaroselController {
  constructor(private readonly caroselService: CarouselService) {}

  @Get()
  getCarousel(): Promise<Carousel[]> {
    return this.caroselService.getCarousel();
  }

  @Post()
  createCarousel(@Body() data: CarouselCreateDto): Promise<Carousel> {
    return this.caroselService.createCarousel(data);
  }

  @Patch(':id')
  updateCarousel(
    @Body() data: CarouselCreateDto,
    @Param('id') id: string,
  ): Promise<Carousel> {
    return this.caroselService.updateCarousel(id, data);
  }

  @Get(':id')
  getCarouselById(@Param('id') id: string): Promise<Carousel> {
    return this.caroselService.getCarouselById(id);
  }

  @Delete(':id')
  deleteCarousel(@Param('id') id: string): Promise<Carousel> {
    return this.caroselService.deleteCarousel(id);
  }
}
