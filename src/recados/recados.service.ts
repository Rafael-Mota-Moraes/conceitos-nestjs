import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RecadosUtils } from './recados.utils';
import { ConfigService, ConfigType } from '@nestjs/config';
import recadosConfig from './recados.config';

@Injectable({ scope: Scope.DEFAULT })
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
    @Inject(recadosConfig.KEY)
    private readonly recadosConfiguration: ConfigType<typeof recadosConfig>,
  ) {
    console.log(recadosConfiguration.teste1);
  }

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 10 } = paginationDto ?? {};

    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: { id: 'desc' },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id: id,
      },
      relations: ['de', 'para'],
      order: { id: 'desc' },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;

    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);

    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: { id: recado.de.id },
      para: { id: recado.para.id },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    if (recado) {
      recado.texto = updateRecadoDto?.texto ?? recado.texto;
      recado.lido = updateRecadoDto?.lido ?? recado.lido;

      await this.recadoRepository.save(recado);

      return recado;
    }
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (recado) return this.recadoRepository.remove(recado);

    this.throwNotFoundError();
  }
}
