import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CarouselCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tittle is required.' })
  tittle?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Image is required.' })
  image: string;
}
