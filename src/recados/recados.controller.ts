import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  // encontrar todos os recados

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  // encontra um recado
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Essa rota retorna apenas um recado: ${id}`;
  }

  @Post()
  create(@Body('recado') body: any) {
    return body;
  }
}
