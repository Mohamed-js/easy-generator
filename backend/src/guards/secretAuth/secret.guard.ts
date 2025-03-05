import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRequest } from 'src/types/express';
import { CustomLogger } from 'src/logger/logger.service';

@Injectable()
export class SecretAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CustomLogger,
  ) { this.logger.setContext(SecretAuthGuard.name) }

  canActivate(context: ExecutionContext): boolean {
    const request: AuthRequest = context.switchToHttp().getRequest<AuthRequest>();

    const secretHeader = request.headers['secretkey'] as string | undefined;
    const secretKey = this.configService.get<string>('FRONT_SECRET_KEY');

    if (!secretHeader || secretHeader !== secretKey) {
      this.logger.warn('Missing or invalid secret key header');
      throw new UnauthorizedException('Missing or invalid token');
    }

    return true;
  }
}
