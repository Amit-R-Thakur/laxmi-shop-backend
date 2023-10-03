import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        return { uri: process.env.MONGODB_URL };
      },
    }),
  ],
})
export class DatabaseModule {}
