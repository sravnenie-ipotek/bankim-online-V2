import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { AuthResponseDto } from './dto/auth-response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  emailLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ): AuthResponseDto {
    return this.authService.emailLogin(email, password);
  }

  @Post('auth-mobile')
  smsLogin(@Body('mobile_number') mobileNumber: string): AuthResponseDto {
    return this.authService.smsLogin(mobileNumber);
  }

  @Post('auth-verify')
  smsVerify(
    @Body('code') code: string,
    @Body('mobile_number') mobileNumber: string,
  ): AuthResponseDto {
    return this.authService.smsVerify(code, mobileNumber);
  }

  @Post('auth-password')
  passwordLogin(
    @Body('mobile_number') mobileNumber: string,
    @Body('password') password: string,
  ): AuthResponseDto {
    return this.authService.passwordLogin(mobileNumber, password);
  }

  @Post('email-code-login')
  emailCodeLogin(
    @Body('code') code: string,
    @Body('email') email: string,
  ): AuthResponseDto {
    return this.authService.emailCodeLogin(code, email);
  }
}
