import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminsController } from './admins.controller';
import { UsersService } from '../users.service';
import { PrismaService } from 'src/prisma.service';
import { OtpService } from 'src/otp/otp.service';
import { EmailOtpService } from 'src/email-otp/email-otp.service';
import { PhoneOtpService } from 'src/phone-otp/phone-otp.service';
import { LogService } from 'src/log/log.service';

@Module({
  controllers: [AdminsController],
  providers: [
    PrismaService,
    JwtService,
    OtpService,
    UsersService,
    EmailOtpService,
    PhoneOtpService,
    LogService,
  ],
})
export class AdminsModule {}
