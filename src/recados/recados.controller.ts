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
import {
  MY_DYNAMIC_CONFIG,
  MyDynamicModuleConfigs,
} from 'src/my-dynamic/my-dynamic.module';

@UsePipes(ParseIntIdPipe)
@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(MY_DYNAMIC_CONFIG)
    private readonly myDynamicConfigs: MyDynamicModuleConfigs,
  ) {
    console.log(myDynamicConfigs);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
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
