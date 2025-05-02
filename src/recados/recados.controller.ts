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
  Query,
} from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  // encontrar todos os recados

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 10 } = pagination;
    return `Essa rota retorna todos os recados: limit:${limit} offset:${offset}`;
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
