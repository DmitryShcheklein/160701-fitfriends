import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { FromEnv } from '../lib/from-env.decorator';
import { configEnvValidator } from '../lib/config-env-validator';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export class BaseAppDto {
  @IsString()
  @IsEnum(ENVIRONMENTS)
  @FromEnv('NODE_ENV')
  environment!: string;

  @IsNumber()
  @FromEnv('PORT')
  port!: number;
}

export const appConfig = registerAs(
  'application',
  configEnvValidator(BaseAppDto)
);
