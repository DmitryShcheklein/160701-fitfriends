import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import { FromEnv } from '../../lib/from-env.decorator';
import { configEnvValidator } from '../../lib/config-env-validator';
import { BaseAppDto } from '../app.config';

export class FileVaultDto extends BaseAppDto {
  @IsString()
  @FromEnv('UPLOAD_DIRECTORY_PATH')
  uploadDirectory: string;

  @IsString()
  @FromEnv('SERVE_ROOT')
  serveRoot: string;
}

export const fileVaultConfig = registerAs(
  'application',
  configEnvValidator(FileVaultDto)
);
