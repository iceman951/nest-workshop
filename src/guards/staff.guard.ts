import { CanActivate, ExecutionContext, Logger } from "@nestjs/common";

export class StaffGuard implements CanActivate {
  private readonly logger = new Logger(StaffGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.log(request.currentUser.role);

    if (!request.currentUser) {
      return false;
    }
    if (
      request.currentUser.role === "staff" ||
      request.currentUser.role === "admin"
    )
      return true;

    return false;
  }
}
