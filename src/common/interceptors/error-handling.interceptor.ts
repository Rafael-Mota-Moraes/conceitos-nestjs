import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          if (error.name == 'NotFoundException') {
            return new BadRequestException(error.message);
          }
        });
      }),
    );
  }
}
