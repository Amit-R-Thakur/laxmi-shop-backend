import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login.dto';
import { SignupDto } from 'src/user/dto/signup.dto';
import { UserDocument } from 'src/user/user.schema';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('signup')
  async signup(@Body() data: SignupDto): Promise<UserDocument> {
    return await this.authService.signup(data);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: LoginDto, @Request() req) {
    const user = req.user.toObject();
    delete user.password;
    user.accessToken = this.jwtService.sign({ _id: user._id });
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
