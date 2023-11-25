import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carousel, CarouselDocument } from './carousel.schema';
import { CarouselCreateDto } from './dto/carousel.dto';

@Injectable()
export class CarouselService {
  constructor(
    @InjectModel(Carousel.name) private carouselModel: Model<CarouselDocument>,
  ) {}
  async getCarousel(): Promise<Carousel[]> {
    return await this.carouselModel.find({});
  }
  async createCarousel(data: CarouselCreateDto): Promise<Carousel> {
    return await this.carouselModel.create(data);
  }
  async updateCarousel(id: string, data: CarouselCreateDto): Promise<Carousel> {
    return await this.carouselModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCarousel(id: string): Promise<Carousel> {
    return await this.carouselModel.findByIdAndDelete(id);
  }
  async getCarouselById(id: string): Promise<Carousel> {
    return await this.carouselModel.findById(id);
  }
}
