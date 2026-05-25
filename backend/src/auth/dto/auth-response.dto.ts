export class AuthResponseDto {
  accessToken!: string;
  refreshToken?: string;
  user!: UserResponseDto;
  expiresIn!: string;
}

export class UserResponseDto {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  phoneNumber?: string;
  isEmailVerified!: boolean;
  isPhoneVerified!: boolean;
  role!: string;
  createdAt!: Date;
}

export class OtpResponseDto {
  message!: string;
  email!: string;
  expiresIn!: number;
}

export class VerificationResponseDto {
  message!: string;
  verified!: boolean;
  redirectUrl?: string;
}

export class MessageResponseDto {
  message!: string;
  success!: boolean;
  data?: any;
}
