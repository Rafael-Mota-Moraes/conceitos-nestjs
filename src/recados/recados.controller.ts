import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { RecadosUtils } from './recados.utils';

@UsePipes(ParseIntIdPipe)
@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    const { limit = 10, offset = 10 } = paginationDto;

    return this.recadosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(this.recadosUtils.inverteString('rafael'));

    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
