import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret, // Replace with your own secret key
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findById(payload._id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
