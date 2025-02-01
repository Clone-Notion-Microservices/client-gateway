import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, USERS_SERVICES } from '../config';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICES,
        transport: Transport.TCP,
        options: {
          host: envs.users_services_host,
          port: envs.users_services_port,
        },
      },
    ]),
  ],
})
export class UsersModule {}
