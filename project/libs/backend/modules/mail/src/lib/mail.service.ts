import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EMAIL_SUBJECT } from './mail.constant';
import { mailConfig } from '@project/config';
import { Subscriber } from '@project/core';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(mailConfig.KEY)
    private readonly mailerConfig: ConfigType<typeof mailConfig>
  ) {}

  public async sendNewRegister(user: Subscriber) {
    const { firstname, email, password } = user;

    await this.mailerService.sendMail({
      from: this.mailerConfig.from,
      to: email,
      subject: EMAIL_SUBJECT.NewRegistration,
      template: './new-registration',
      context: {
        firstname,
        email,
        password,
      },
    });
  }
}
