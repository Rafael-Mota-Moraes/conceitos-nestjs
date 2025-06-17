import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigType } from '@nestjs/config';
import globalConfig from 'src/global-config/global.config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(globalConfig.KEY)
    private readonly globalConfigurations: ConfigType<typeof globalConfig>,
  ) {}

  // @Get('hello')
  getHello(): string {
    return '<h1>Qualquer coisa 1</h1>';
  }
}
