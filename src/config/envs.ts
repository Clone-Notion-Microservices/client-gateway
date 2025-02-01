import 'dotenv/config';

import * as joi from 'joi';
import * as process from 'node:process';

interface EnvVariables {
  PORT: number;
  PROJECT_SERVICES_HOST: string;
  PROJECT_SERVICES_PORT: number;
  TASKS_SERVICES_HOST: string;
  TASKS_SERVICES_PORT: number;
  USERS_SERVICES_HOST: string;
  USERS_SERVICES_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PROJECT_SERVICES_HOST: joi.string().required(),
    PROJECT_SERVICES_PORT: joi.number().required(),
    TASKS_SERVICES_HOST: joi.string().required(),
    TASKS_SERVICES_PORT: joi.number().required(),
    USERS_SERVICES_HOST: joi.string().required(),
    USERS_SERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Validation error: ${error.message}`);
}

const envVariables: EnvVariables = value;
export const envs = {
  port: envVariables.PORT,
  project_services_host: envVariables.PROJECT_SERVICES_HOST,
  project_services_port: envVariables.PROJECT_SERVICES_PORT,
  tasks_services_host: envVariables.TASKS_SERVICES_HOST,
  tasks_services_port: envVariables.TASKS_SERVICES_PORT,
  users_services_host: envVariables.USERS_SERVICES_HOST,
  users_services_port: envVariables.USERS_SERVICES_PORT,
};
