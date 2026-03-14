import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class SubmitBrokerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  city: string;

  @IsString()
  desiredRegion: string;

  @IsString()
  employmentType: string;

  @IsString()
  monthlyIncome: string;

  @IsString()
  experience: string;

  @IsBoolean()
  hasClientCases: boolean;

  @IsBoolean()
  hasDebtCases: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  additionalInfo?: string;

  @IsBoolean()
  agreeTerms: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  licenseNumber?: string;
}
