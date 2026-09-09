import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Invalid request body", details: result.error.flatten() });
      return;
    }
    req.body = result.data;
    next();
  };
}

/**
 * Express types req.query as ParsedQs (strings only), which can't hold the
 * coerced values zod produces (e.g. series as a number). Parsed output goes
 * in res.locals.query instead of overwriting req.query.
 */
export function validateQuery(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({ error: "Invalid query params", details: result.error.flatten() });
      return;
    }
    res.locals.query = result.data;
    next();
  };
}
