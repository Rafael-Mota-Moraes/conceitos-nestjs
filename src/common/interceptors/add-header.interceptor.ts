import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RecadosService } from 'src/recados/recados.service';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  constructor(private readonly recadosService: RecadosService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const response = context.switchToHttp().getResponse();

    const recado = await this.recadosService.findOne(30);

    response.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    return next.handle();
  }
}
