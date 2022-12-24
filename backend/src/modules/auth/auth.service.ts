import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import * as bycrypt from 'bcrypt';
import { BasicUser, LoginUser, User } from 'src/models/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: EntityRepository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<BasicUser> {
    const user = await this.UserRepository.findOne({ email: email });
    if (user && (await bycrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, id }: LoginUser): Promise<any> {
    const payload = { email: email, sub: id };
    const access_token = this.jwtService.sign(payload);
    this.updateLoginDate(id);
    return {
      access_token: access_token,
      id: id,
    };
  }

  async register(userData: User): Promise<boolean> {
    return await this.userService.create(userData);
  }

  updateLoginDate(id: number): void {
    this.UserRepository.nativeUpdate({ id: id }, { lastLogin: new Date() });
  }
}
