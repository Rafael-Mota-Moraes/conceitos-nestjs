import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 300));

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now();
      }),
    );
  }
}
