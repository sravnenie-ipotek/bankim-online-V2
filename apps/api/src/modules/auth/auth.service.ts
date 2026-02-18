import { Injectable } from '@nestjs/common';
import type { AuthResponseDto } from './dto/auth-response.dto.js';

@Injectable()
export class AuthService {
  emailLogin(email: string, password: string): AuthResponseDto {
    void password;
    return { success: true, message: `Email login accepted for ${email}` };
  }

  smsLogin(mobileNumber: string): AuthResponseDto {
    return { success: true, message: `SMS login started for ${mobileNumber}` };
  }

  smsVerify(code: string, mobileNumber: string): AuthResponseDto {
    return {
      success: true,
      message: `SMS code ${code} verified for ${mobileNumber}`,
    };
  }

  passwordLogin(mobileNumber: string, password: string): AuthResponseDto {
    void password;
    return {
      success: true,
      message: `Password login accepted for ${mobileNumber}`,
    };
  }

  emailCodeLogin(code: string, email: string): AuthResponseDto {
    return {
      success: true,
      message: `Email code ${code} accepted for ${email}`,
    };
  }
}
