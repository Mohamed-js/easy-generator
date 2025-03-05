import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: CustomLogger) { }

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip } = req;
        const userAgent = req.headers['user-agent'] || '';
        const startTime = Date.now();

        res.on('finish', () => {
            const responseTime = Date.now() - startTime;
            const { statusCode } = res;

            this.logger.log(
                `${method} ${originalUrl} [${statusCode}] - ${responseTime}ms - ${userAgent} - ${ip}`,
                'RequestLogger',
            );
        });

        next();
    }
}
