import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello')
  getHello(): string {
    return '<h1>Qualquer coisa 1</h1>';
  }
}
