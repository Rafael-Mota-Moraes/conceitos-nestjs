import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import appConfig from './app.config';
import { ConfigType } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(appConfig.KEY)
    private readonly appConfigurations: ConfigType<typeof appConfig>,
  ) {}

  // @Get('hello')
  getHello(): string {
    return '<h1>Qualquer coisa 1</h1>';
  }
}
