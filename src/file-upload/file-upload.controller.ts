// file-upload.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@ApiTags('File Upload')
@Controller('uploads')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('single')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    // Handle single file upload
    const fileUrl = await this.fileUploadService.uploadFile(
      file,
      'single-files',
    );
    return { url: fileUrl };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // Handle multiple file upload
    const uploadPromises = files.map((file) =>
      this.fileUploadService.uploadFile(file, 'multi-files'),
    );
    const fileUrls = await Promise.all(uploadPromises);
    return fileUrls.map((url) => ({ url }));
  }
}
