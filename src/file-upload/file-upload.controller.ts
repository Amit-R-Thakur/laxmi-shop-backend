// file-upload.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Get,
  UploadedFile,
  Delete,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { MultipleFileDto, SingleFileDto } from './dto/file-upload.dto';
import { FileKey } from './dto/key.enum';

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('single')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(
    @Body() data: SingleFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = await this.fileUploadService.uploadFile(file, data.key);
    return { url: fileUrl };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  async uploadMultipleFiles(
    @Body() data: MultipleFileDto,
    @UploadedFile() files: Express.Multer.File[],
  ) {
    // Handle multiple file upload
    const uploadPromises = files.map((file) =>
      this.fileUploadService.uploadFile(file, data.key),
    );
    const fileUrls = await Promise.all(uploadPromises);
    return fileUrls.map((url) => ({ url }));
  }

  @Get('keys')
  getKeys(): string[] {
    return Object.values(FileKey).filter((key) => typeof key === 'string');
  }

  @Delete()
  async deleteFileByUrl(@Query('url') url: string): Promise<void> {
    try {
      await this.fileUploadService.deleteFileByUrl(url);
    } catch (error) {
      throw new NotFoundException('File not found or could not be deleted');
    }
  }
}
