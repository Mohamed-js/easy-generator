import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRequest } from 'src/types/express';
import { Types } from 'mongoose';
import { CustomLogger } from 'src/logger/logger.service';

interface JwtPayload {
  userId: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLogger,
  ) { this.logger.setContext(JwtAuthGuard.name) }

  canActivate(context: ExecutionContext): boolean {
    const request: AuthRequest = context.switchToHttp().getRequest<AuthRequest>();

    const secretHeader = request.headers['secretkey'] as string | undefined;
    const secretKey = this.configService.get<string>('FRONT_SECRET_KEY');

    if (!secretHeader || secretHeader !== secretKey) {
      this.logger.warn('Missing or invalid secret key header');
      throw new UnauthorizedException('Missing or invalid token');
    }

    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader?.startsWith('Bearer ')) {
      this.logger.warn('Missing or invalid authorization header');
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const payload = this.jwtService.verify<JwtPayload>(token, { secret: jwtSecret });

      if (!payload?.userId) {
        this.logger.error('Invalid JWT payload: Missing userId');
        throw new UnauthorizedException('Invalid token payload');
      }

      request.userId = new Types.ObjectId(payload.userId);
      this.logger.debug(`JWT verified for user: ${payload.userId}`);
      return true;
    } catch ({ message, stack }) {
      this.logger.error(`JWT verification failed: ${message}`, `${stack}`);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
