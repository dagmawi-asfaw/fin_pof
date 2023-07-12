import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountController } from './bank_account/bank_account.controller';

@Module({
  imports: [],
  controllers: [AppController, BankAccountController],
  providers: [AppService],
})
export class AppModule {}
