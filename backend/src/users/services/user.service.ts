import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = await this.hashPassword(password);
    user.phoneNumber = createUserDto.phoneNumber || '';
    user.dateOfBirth = createUserDto.dateOfBirth ? new Date(createUserDto.dateOfBirth) : new Date();
    user.address = createUserDto.address || '';
    user.city = createUserDto.city || '';
    user.state = createUserDto.state || '';
    user.zipCode = createUserDto.zipCode || '';
    user.panNumber = createUserDto.panNumber || '';
    user.aadhaarNumber = createUserDto.aadhaarNumber || '';
    user.role = 'user';

    return this.userRepository.save(user);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Update user profile
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  /**
   * Hash password
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare password
   */
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Mark email as verified
   */
  async verifyEmail(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isEmailVerified = true;
    return this.userRepository.save(user);
  }

  /**
   * Update last login
   */
  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLoginAt: new Date() });
  }

  /**
   * Reset password
   */
  async resetPassword(id: string, newPassword: string): Promise<User> {
    const user = await this.findById(id);
    user.password = await this.hashPassword(newPassword);
    return this.userRepository.save(user);
  }

  /**
   * Get user count
   */
  async getUserCount(): Promise<number> {
    return this.userRepository.count();
  }

  /**
   * Get all users (with pagination)
   */
  async getAllUsers(skip = 0, take = 10): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Deactivate user account
   */
  async deactivateUser(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }

  /**
   * Activate user account
   */
  async activateUser(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isActive = true;
    return this.userRepository.save(user);
  }
}
