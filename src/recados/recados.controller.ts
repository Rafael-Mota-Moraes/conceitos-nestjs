import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Essa rota apaga o recado: ${id}`;
  }
}
