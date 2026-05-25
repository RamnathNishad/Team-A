import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';

@Entity('otps')
@Index(['email', 'createdAt'])
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  code: string; // 6-digit OTP

  @Column({ default: 'registration' })
  type: string; // registration, password-reset, phone-verification

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({ default: 0 })
  attemptCount: number;

  @Column({ default: false })
  isLocked: boolean;

  // Metadata for tracking
  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;
}
