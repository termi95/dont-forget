import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user/user.entity';
import * as bycrypt from 'bcrypt';
import { BasicUser, User } from 'src/models/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: EntityRepository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<BasicUser | undefined> {
    try {
      const user = await this.UserRepository.findOne({ email: email });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async create({ username, email, password }: User): Promise<boolean> {
    const user = await this.UserRepository.findOne({ email: email });
    if (user) {
      throw new HttpException('Email is taken.', HttpStatus.CONFLICT);
    }
    await this.validateUserData(username, email, password);

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    try {
      await this.UserRepository.persistAndFlush(
        new UserEntity(username, email, hashedPassword),
      );
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async validateUserData(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.checkIfUserEmailIsValid(email);
    await this.checkIfUsernameIsValid(username);
    await this.checkIfPasswordIsValid(password);
  }
  async checkIfUserEmailIsValid(email: string): Promise<void> {
    const validRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(validRegex)) {
      throw new Error('Invalid email address format.');
    }
  }
  async checkIfUsernameIsValid(username: string): Promise<void> {
    if (username.length < 3) {
      throw new Error('User name is to short, minimum lenght is 3');
    }
    if (username.length > 32) {
      throw new Error('User name is to long, maximum lenght is 32');
    }
  }
  async checkIfPasswordIsValid(password: string): Promise<void> {
    if (!(password.length >= 8)) {
      throw new Error('Password minimum lenght is 8 character.');
    }
    if (!(password !== password.toLowerCase())) {
      throw new Error('Password must have different case character.');
    }
    if (!password.match(/\d+/g)) {
      throw new Error('Password must have number in it.');
    }
    if (!password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      throw new Error('Password must have special character in it.');
    }
  }
}
