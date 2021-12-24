import { CanActivate, ExecutionContext } from "@nestjs/common";

export class StaffGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
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
