import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async health(): Promise<string> {
    return 'Social Media API online!';
  }
}
