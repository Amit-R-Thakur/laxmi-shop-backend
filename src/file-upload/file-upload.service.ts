import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { S3 } from 'src/utils/aws.config';
@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    if (!file) {
      throw new HttpException('Please add a file', HttpStatus.BAD_REQUEST);
    }
    if (!file.mimetype.startsWith('image')) {
      throw new HttpException(
        'Please upload an image file',
        HttpStatus.BAD_REQUEST,
      );
    }
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${folder}/${new mongoose.Types.ObjectId()}${file.originalname.substr(
        file.originalname.lastIndexOf('.'),
      )}`,
      Body: file.buffer,
    };

    const uploadResponse = await S3.upload(params).promise();
    return uploadResponse.Location;
  }

  async deleteFileByUrl(url: string): Promise<void> {
    try {
      const key = this.extractKeyFromUrl(url);
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      };

      await S3.deleteObject(params).promise();
    } catch (error) {
      throw new HttpException(
        'Failed to delete the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractKeyFromUrl(url: string): string {
    const urlParts = url.split('/');
    const key = urlParts.slice(3).join('/');
    return key;
  }
}
