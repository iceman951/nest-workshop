import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction) {
    response.on("finish", () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;

// import { Injectable, NestMiddleware } from "@nestjs/common";
// import type { Request, Response } from "express";
// import { nanoid } from "nanoid";

// import { Logger } from "../providers";

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   private passUrl: string[] = ['/health', '/graphql'];
//   // GraphQL logging uses the apollo plugins.
//   // https://docs.nestjs.com/graphql/plugins
//   // https://www.apollographql.com/docs/apollo-server/integrations/plugins/
//   // https://github.com/nestjs/graphql/issues/923

//   constructor(private readonly logger: Logger) {}

//   public use(req: Request, res: Response, next: () => void): void {
//     if (this.passUrl.includes(req.originalUrl)) {
//       return next();
//     }

//     req.id = req.header('X-Request-Id') || nanoid();
//     res.setHeader('X-Request-Id', req.id);

//     const user = req.user?.userId || '';
//     this.logger.log(`${req.method} ${req.originalUrl} - ${req.ip.replace('::ffff:', '')} ${user}`);

//     return next();
//   }
// }
