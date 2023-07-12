import { Controller,Get,Req } from '@nestjs/common';

@Controller('bank-account')
export class BankAccountController {
    @Get()
    findAll(@Req() request: Request): Array<any> { 
        return [];
    }


}
