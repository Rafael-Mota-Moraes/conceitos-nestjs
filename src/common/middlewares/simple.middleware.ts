import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Rafael',
        sobrenome: 'Moreira',
        role: 'admin',
      };
    }

    // return res.status(404).send({
    //   message: 'Não encontrado',
    // });

    next();
  }
}
