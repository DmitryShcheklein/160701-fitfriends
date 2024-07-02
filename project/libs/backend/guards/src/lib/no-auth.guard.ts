import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !request.user; // Проверяем, что пользователь не аутентифицирован
  }
}