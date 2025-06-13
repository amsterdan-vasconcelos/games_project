import { SafeParseError, Schema } from 'zod';
import { RequestHandler } from 'express';

type Property = 'body' | 'query' | 'header' | 'params';

type Schemas = Partial<Record<Property, Schema<unknown>>>;

type Validation = (schemas: Schemas) => RequestHandler;

type ValidationError = Record<string, Record<string, string>>;

const formatErrorsZod = (safeParseError: SafeParseError<unknown>) => {
  const errorsZod = safeParseError.error.flatten().fieldErrors;
  const errorsZodArray = Object.entries(errorsZod);
  const returnErrors: Record<string, string> = {};

  for (const [key, message] of errorsZodArray) {
    if (Array.isArray(message)) {
      returnErrors[key] = message.join(' ');
    }
  }

  return returnErrors;
};

const validation: Validation = (schemas) => (req, res, next) => {
  const schemasArray = Object.entries(schemas);
  const errors: ValidationError = {};
  const validatedData: Record<string, unknown> = {};

  for (const [key, schema] of schemasArray) {
    const prop = key as Property;

    const value =
      prop === 'header'
        ? Object.fromEntries(
            Object.entries(req.headers).map(([k, v]) => [
              k,
              Array.isArray(v) ? v.join(', ') : (v ?? ''),
            ]),
          )
        : req[prop];

    const result = schema.safeParse(value);

    if (!result.success) {
      errors[prop] = formatErrorsZod(result);
      continue;
    }

    validatedData[`validated_${key}`] = result.data;
  }

  const hasErrors = Object.keys(errors).length !== 0;

  if (!hasErrors) {
    Object.assign(res.locals, validatedData);
    return next();
  }

  res.status(400).json({ errors });
};

export { validation };
