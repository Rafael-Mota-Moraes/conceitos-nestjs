import { registerAs } from '@nestjs/config';

export default registerAs('recados', () => ({
  teste1: 'valor1',
  teste2: 'valor2',
}));
