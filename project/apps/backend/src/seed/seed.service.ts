// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '@project/auth-module';
import { UserGender, UserLocation, UserRole } from '@project/enums';

@Injectable()
export class SeedService {
  constructor(private readonly authService: AuthenticationService) {}

  public async seed() {
    await this.authService.register({
      firstname: 'admin',
      password: 'admin',
      email: 'seed@seed.ts',
      gender: UserGender.Male,
      location: UserLocation.Petrogradskaya,
      role: UserRole.User,
    });

    // for (let i = 1; i <= 20; i++) {
    //   await this.productService.create({
    //     name: `Product ${i}`,
    //     price: Math.round(Math.random() * 100),
    //   });
    // }
  }
}
