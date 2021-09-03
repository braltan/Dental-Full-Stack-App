import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

@Injectable()
export class ApplicationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if(req.url.includes('api')){
        next()
      }else{
        return res.sendFile(path.resolve('frontend-angular/index.html'));
      }
  }
}