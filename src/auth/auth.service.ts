import { Injectable } from '@nestjs/common';
import { SignupDto } from 'src/user/dto/signup.dto';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signup(data: SignupDto): Promise<UserDocument> {
    const salt = bcrypt.genSaltSync(10);
    return this.userService.createUser({
      ...data,
      password: await bcrypt.hash(data.password, salt),
    });
  }
  async validateAuth(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmailOrMobile(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
