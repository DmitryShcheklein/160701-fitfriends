import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/config';

@Module({
  imports: [MailerModule.forRootAsync(getMailerAsyncOptions())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
