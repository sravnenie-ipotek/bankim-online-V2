import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AdminJwtPayload } from '../interfaces/admin-jwt-payload.interface';

/**
 * Guard that replicates the Express `requireAdmin` middleware.
 *
 * Contract (must match Express exactly):
 *   - Reads `Authorization: Bearer <token>`
 *   - Verifies with JWT_SECRET
 *   - Requires `decoded.role` AND `decoded.is_staff`
 *   - Attaches decoded payload to `request.admin`
 */
@Injectable()
export class AdminJwtGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      admin?: AdminJwtPayload;
    }>();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Admin access required');
    }

    const token = authHeader.substring(7);
    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    try {
      const decoded = jwt.verify(token, secret) as AdminJwtPayload;

      if (!decoded.role || !decoded.is_staff) {
        throw new ForbiddenException('Admin privileges required');
      }

      request.admin = decoded;
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      throw new UnauthorizedException('Invalid admin token');
    }
  }
}
