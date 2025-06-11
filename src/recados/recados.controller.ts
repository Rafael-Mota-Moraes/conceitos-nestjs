import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { RegexProtocol } from 'src/common/regex/regex-protocol.regex';
import { REMOVE_SPACES_REGEX } from './recados.constant';

@UsePipes(ParseIntIdPipe)
@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RegexProtocol,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(this.removeSpacesRegex.execute('REMOVE OS ESPACOS'));
    const { limit = 10, offset = 10 } = paginationDto;
    return this.recadosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
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
