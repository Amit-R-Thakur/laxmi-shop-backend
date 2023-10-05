import { Injectable } from '@nestjs/common';
import { S3 } from 'src/utils/aws.config';
@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const params = {
      Bucket: 'YOUR_S3_BUCKET_NAME',
      Key: `${folder}/${file.originalname}`,
      Body: file.buffer,
    };

    const uploadResponse = await S3.upload(params).promise();
    return uploadResponse.Location;
  }
}
