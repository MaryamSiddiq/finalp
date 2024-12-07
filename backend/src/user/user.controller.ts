// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body('username') username: string, 
    @Body('email') email: string, 
    @Body('password') password: string
  ): Promise<User> {
    return this.userService.signup(username, email, password);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string): Promise<User> {
    return this.userService.verifyOtp(email, otp);
  }
  

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<User> {
    return this.userService.login(email, password);
  }
}
