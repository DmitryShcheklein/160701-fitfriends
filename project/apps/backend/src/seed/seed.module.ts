// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthenticationModule } from '@project/auth-module';

@Module({
  imports: [AuthenticationModule],
  providers: [SeedService],
})
export class SeedModule {}
