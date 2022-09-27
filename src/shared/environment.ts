import * as Joi from 'joi';

export interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

export const EnvironmentVariablesSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().default(
    'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
  ),
  JWT_SECRET: Joi.string(),
});
