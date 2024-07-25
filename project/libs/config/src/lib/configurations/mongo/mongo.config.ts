import { registerAs } from '@nestjs/config';
import { FromEnv } from '../../lib/from-env.decorator';
import { configEnvValidator } from '../../lib/config-env-validator';
import { IsNumber, IsString, Max, Min } from 'class-validator';

const Port = {
  Min: 0,
  Max: 65535,
};

export class MongoDto {
  @IsString()
  @FromEnv('MONGO_HOST')
  host!: string;

  @IsNumber()
  @Min(Port.Min)
  @Max(Port.Max)
  @FromEnv('MONGO_PORT')
  port!: number;

  @IsString()
  @FromEnv('MONGO_DB')
  name!: string;

  @IsString()
  @FromEnv('MONGO_USER')
  user!: string;

  @IsString()
  @FromEnv('MONGO_PASSWORD')
  password!: string;

  @IsString()
  @FromEnv('MONGO_AUTH_BASE')
  authBase!: string;
}

export const mongoConfig = registerAs('db', configEnvValidator(MongoDto));
