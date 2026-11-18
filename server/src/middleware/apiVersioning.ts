import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * URL-based API Versioning Middleware
 * Example: /api/v1/trade -> matches version "v1"
 */
export const urlVersioning = (version: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Use req.originalUrl to check the full path before Express strips mount prefixes
    if (req.originalUrl.startsWith(`/api/${version}`)) {
      next();
    } else {
      res.status(404).json({
        success: false,
        error: `API version not supported. Expected path prefix starting with /api/${version}`,
      });
    }
  };
};

export const headerVersioning = (version: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const acceptVersion = req.get('Accept-Version');
    if (acceptVersion === version) {
      next();
    } else {
      res.status(404).json({
        success: false,
        error: `API version not supported. Expected header Accept-Version: ${version}`,
      });
    }
  };
};

export const contentTypeVersioning = (version: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const contentType = req.get('Content-Type');

    if (
      contentType &&
      contentType.includes(`application/vnd.api.${version}+json`)
    ) {
      next();
    } else {
      res.status(404).json({
        success: false,
        error: `API version not supported. Expected Content-Type: application/vnd.api.${version}+json`,
      });
    }
  };
};