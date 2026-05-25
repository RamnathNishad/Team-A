import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/users/services/user.service';
import { OtpService } from './otp.service';
import {
  RegisterDto,
  LoginDto,
  VerifyOtpDto,
  SendOtpDto,
  ResetPasswordDto,
  ForgotPasswordDto,
} from '../dto/auth.dto';
import { AuthResponseDto, UserResponseDto, OtpResponseDto } from '../dto/auth-response.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register new user
   */
  async register(registerDto: RegisterDto): Promise<OtpResponseDto> {
    // Validate passwords match
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Create OTP for email verification
    const otp = await this.otpService.createOtp(registerDto.email, 'registration');

    // TODO: Send OTP via email service
    // await this.emailService.sendOtp(registerDto.email, otp.code);

    // Store registration data temporarily (in practice, use Redis or cache)
    // For now, we'll store the user after OTP verification

    return {
      message: 'OTP sent to your email',
      email: registerDto.email,
      expiresIn: 600, // 10 minutes
    };
  }

  /**
   * Verify OTP during registration
   */
  async verifyRegistrationOtp(verifyOtpDto: VerifyOtpDto, password: string): Promise<AuthResponseDto> {
    // Verify OTP
    const otp = await this.otpService.verifyOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp,
      'registration',
    );

    // Check if user was already created (in case of multiple OTP verifications)
    let user = await this.userService.findByEmail(verifyOtpDto.email);

    if (!user) {
      // Create user with verified email
      user = await this.userService.create(
        {
          firstName: 'User', // TODO: Get from registration request
          lastName: '',
          email: verifyOtpDto.email,
        },
        password,
      );
    }

    user.isEmailVerified = true;
    // TODO: Save user

    return this.generateAuthResponse(user);
  }

  /**
   * Login user
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await this.userService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update last login
    await this.userService.updateLastLogin(user.id);

    return this.generateAuthResponse(user);
  }

  /**
   * Send OTP for password reset
   */
  async sendPasswordResetOtp(forgotPasswordDto: ForgotPasswordDto): Promise<OtpResponseDto> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return {
        message: 'If the email exists, OTP has been sent',
        email: forgotPasswordDto.email,
        expiresIn: 600,
      };
    }

    // Create OTP for password reset
    const otp = await this.otpService.createOtp(forgotPasswordDto.email, 'password-reset');

    // TODO: Send OTP via email service
    // await this.emailService.sendPasswordResetOtp(user.email, otp.code);

    return {
      message: 'OTP sent to your email',
      email: forgotPasswordDto.email,
      expiresIn: 600,
    };
  }

  /**
   * Reset password with OTP
   */
  async resetPasswordWithOtp(resetPasswordDto: ResetPasswordDto): Promise<AuthResponseDto> {
    // Verify OTP
    await this.otpService.verifyOtp(
      resetPasswordDto.email,
      resetPasswordDto.token,
      'password-reset',
    );

    const user = await this.userService.findByEmail(resetPasswordDto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Update password
    await this.userService.resetPassword(user.id, resetPasswordDto.newPassword);

    return this.generateAuthResponse(user);
  }

  /**
   * Verify OTP (generic)
   */
  async verifyOtp(email: string, code: string, type: string = 'registration'): Promise<boolean> {
    try {
      await this.otpService.verifyOtp(email, code, type);
      return true;
    } catch (error) {
      await this.otpService.trackFailedAttempt(email, type);
      return false;
    }
  }

  /**
   * Generate JWT token and auth response
   */
  private generateAuthResponse(user: User): AuthResponseDto {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: this.mapUserToResponse(user),
      expiresIn: this.configService.get('JWT_EXPIRATION', '7d'),
    };
  }

  /**
   * Map user entity to response DTO
   */
  private mapUserToResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  /**
   * Validate JWT token
   */
  async validateUser(payload: any): Promise<User | null> {
    const user = await this.userService.findById(payload.sub);
    return user || null;
  }
}
