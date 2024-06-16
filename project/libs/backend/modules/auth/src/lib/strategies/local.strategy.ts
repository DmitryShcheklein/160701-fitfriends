import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { User } from '@project/core';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.userService.verifyUser({ email, password });
  }
}
