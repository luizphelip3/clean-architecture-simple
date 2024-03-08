import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  async health(): Promise<string> {
    const health = await this.appService.health();

    if (typeof health !== 'string') {
      return 'Social Media API out of service. Please try again later.';
    }

    return health;
  }
}
