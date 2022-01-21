import { ConsoleLogger } from "@nestjs/common";
export class MyLogger extends ConsoleLogger {
  audit(message: any, stack?: string, context?: string) {
    console.log(message, stack, context);
  }
}
