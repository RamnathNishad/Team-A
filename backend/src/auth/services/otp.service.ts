import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Otp } from '../entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  /**
   * Generate a random 6-digit OTP
   */
  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Create and save OTP in database
   */
  async createOtp(email: string, type: string = 'registration'): Promise<Otp> {
    // Delete previous OTPs for this email
    await this.otpRepository.delete({ email, type });

    const otp = new Otp();
    otp.email = email;
    otp.code = this.generateOtp();
    otp.type = type;
    otp.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    return this.otpRepository.save(otp);
  }

  /**
   * Verify OTP code
   */
  async verifyOtp(email: string, code: string, type: string = 'registration'): Promise<Otp> {
    const otp = await this.otpRepository.findOne({
      where: {
        email,
        code,
        type,
        isVerified: false,
      },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otp.isLocked) {
      throw new BadRequestException('OTP is locked due to too many attempts');
    }

    if (new Date() > otp.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    otp.isVerified = true;
    otp.verifiedAt = new Date();

    return this.otpRepository.save(otp);
  }

  /**
   * Track failed OTP attempts
   */
  async trackFailedAttempt(email: string, type: string): Promise<void> {
    const otp = await this.otpRepository.findOne({
      where: { email, type, isVerified: false },
      order: { createdAt: 'DESC' },
    });

    if (otp) {
      otp.attemptCount += 1;

      // Lock after 5 attempts
      if (otp.attemptCount >= 5) {
        otp.isLocked = true;
      }

      await this.otpRepository.save(otp);
    }
  }

  /**
   * Clean up expired OTPs
   */
  async cleanupExpiredOtps(): Promise<void> {
    await this.otpRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }

  /**
   * Get OTP by email and type
   */
  async getOtpByEmail(email: string, type: string): Promise<Otp | null> {
    return this.otpRepository.findOne({
      where: { email, type, isVerified: false },
      order: { createdAt: 'DESC' },
    });
  }
}
