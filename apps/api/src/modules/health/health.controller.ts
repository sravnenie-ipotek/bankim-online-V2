import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('server-mode')
  getServerMode() {
    return this.healthService.getServerMode();
  }

  @Get('health')
  getHealth() {
    return this.healthService.getHealth();
  }

  @Get('v1/health')
  getHealthV1() {
    return this.healthService.getHealth();
  }

  @Get('content-db/health')
  async getContentDbHealth() {
    return this.healthService.getContentDbHealth();
  }

  @Get('content-db/test')
  async getContentDbTest() {
    return this.healthService.getContentDbTest();
  }

  @Get('content-db/tables')
  async getContentDbTables() {
    return this.healthService.getContentDbTables();
  }
}
