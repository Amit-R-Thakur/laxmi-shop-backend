import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: SignupDto): Promise<UserDocument> {
    if (
      (await this.userModel.count({
        $or: [{ email: data.email }, { mobile: data.mobile }],
      })) > 0
    ) {
      throw new BadRequestException('Account exist with email or mobile');
    }
    return await this.userModel.create(data);
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }
  async findByEmailOrMobile(emailOrMobile: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });
  }
  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userModel.find({});
  }
}
