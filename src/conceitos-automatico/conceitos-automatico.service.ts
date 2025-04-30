import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  solucionaHome(): string {
    return 'Home do automatico manual usando service';
  }
}
