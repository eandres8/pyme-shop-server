import 'dotenv/config';
import * as joi from 'joi';

type EnvVars = {
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
};

const envSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_USERNAME: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  PORT: Number(process.env.PORT),
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
});

if (error) {
  throw new Error(`Config validation error: ${error}`);
}

export const envs: EnvVars = value;
