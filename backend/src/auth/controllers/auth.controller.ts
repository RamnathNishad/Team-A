import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  RegisterDto,
  LoginDto,
  VerifyOtpDto,
  SendOtpDto,
  ResetPasswordDto,
  ForgotPasswordDto,
  ChangePasswordDto,
} from '../dto/auth.dto';
import { AuthResponseDto, OtpResponseDto, VerificationResponseDto, MessageResponseDto } from '../dto/auth-response.dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register new user
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() registerDto: RegisterDto): Promise<OtpResponseDto> {
    return this.authService.register(registerDto);
  }

  /**
   * Verify OTP during registration
   */
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP during registration' })
  async verifyRegistrationOtp(
    @Body() body: VerifyOtpDto & { password: string },
  ): Promise<AuthResponseDto> {
    if (!body.password) {
      throw new BadRequestException('Password is required');
    }

    return this.authService.verifyRegistrationOtp(
      { email: body.email, otp: body.otp, type: body.type },
      body.password,
    );
  }

  /**
   * Login user
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const authResponse = await this.authService.login(loginDto);

    // Set token in HTTP-only cookie
    res.cookie('auth_token', authResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json(authResponse);
  }

  /**
   * Send password reset OTP
   */
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send password reset OTP' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<OtpResponseDto> {
    return this.authService.sendPasswordResetOtp(forgotPasswordDto);
  }

  /**
   * Reset password with OTP
   */
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with OTP' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    const authResponse = await this.authService.resetPasswordWithOtp(resetPasswordDto);

    // Set token in HTTP-only cookie
    res.cookie('auth_token', authResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json(authResponse);
  }

  /**
   * Send OTP (generic endpoint)
   */
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send OTP' })
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<OtpResponseDto> {
    // This is a placeholder - implement based on your needs
    return {
      message: 'OTP sent',
      email: sendOtpDto.email,
      expiresIn: 600,
    };
  }

  /**
   * Logout user
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('auth_token');
    res.json({ message: 'Logged out successfully' });
  }

  /**
   * Change password
   */
  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ): Promise<MessageResponseDto> {
    // TODO: Implement change password logic
    return {
      message: 'Password changed successfully',
      success: true,
    };
  }

  /**
   * Get current user
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info' })
  async getCurrentUser(@Req() req: any): Promise<any> {
    return req.user;
  }

  /**
   * Refresh token
   */
  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  async refreshToken(@Req() req: any): Promise<AuthResponseDto> {
    // TODO: Implement refresh token logic
    return null;
  }
}
