import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
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
}
