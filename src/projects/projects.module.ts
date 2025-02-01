import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PROJECT_SERVICES } from '../config';

@Module({
  controllers: [ProjectsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PROJECT_SERVICES,
        transport: Transport.TCP,
        options: {
          host: envs.project_services_host,
          port: envs.project_services_port,
        },
      },
    ]),
  ],
})
export class ProjectsModule {}
