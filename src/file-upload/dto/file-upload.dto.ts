import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FileKey } from './key.enum';

export class SingleFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FileKey, {
    message:
      'Invalid file key. Allowed values are: banner, profile, product, category.',
  })
  key: FileKey;
}

export class MultipleFileDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsNotEmpty()
  files: Express.Multer.File[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FileKey, {
    message: 'Invalid file key.',
  })
  key: FileKey;
}
