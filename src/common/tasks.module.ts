import { Module } from '@nestjs/common';
import { TasksController } from '../tasks/tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, TASKS_SERVICES } from '../config';

@Module({
  controllers: [TasksController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: TASKS_SERVICES, transport: Transport.TCP, options: {
          host: envs.tasks_services_host,
          port: envs.tasks_services_port,
        },
      },
    ]),
  ],
})
export class TasksModule {}
