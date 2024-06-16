import { Module } from '@nestjs/common';
import { HasherService } from './hasher.service';
import { SALT_ROUNDS } from './hasher.const';
import { HasherComponent } from './hasher.enum';

@Module({
  providers: [
    {
      provide: HasherComponent.Service,
      useClass: HasherService,
    },
    {
      provide: HasherComponent.SaltRounds,
      useValue: SALT_ROUNDS,
    },
  ],
  exports: [HasherComponent.Service],
})
export class HasherModule {}
