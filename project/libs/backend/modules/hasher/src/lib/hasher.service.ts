import { Inject, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { Hasher } from './hasher.interface';
import { HasherComponent } from './hasher.enum';

@Injectable()
export class HasherService implements Hasher {
  constructor(
    @Inject(HasherComponent.SaltRounds)
    private readonly saltRounds: number
  ) {}

  public async generatePasswordHash(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);

    return hash(password, salt);
  }
  public async comparePassword({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }) {
    return compare(password, passwordHash);
  }
}
