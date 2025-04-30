import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  // encontrar todos os recados
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  // encontra um recado
  @Get(':id')
  findOne() {
    return 'Essa rota retorna apenas um recado';
  }
}
