import { Controller, Post, Body } from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { SubmitBrokerDto } from './dto/submit-broker.dto';

@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Post('submit')
  submit(@Body() body: SubmitBrokerDto) {
    return this.brokersService.submit(body);
  }
}
