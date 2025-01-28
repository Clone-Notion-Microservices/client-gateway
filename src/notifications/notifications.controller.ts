import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TASKS_SERVICES } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICES) private readonly tasksClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateNotificationDto) {
    return this.tasksClient.send('createProject', createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksClient.send('createProject', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksClient.send('createProject',+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateNotificationDto) {
    return this.tasksClient.send('createProject', {});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksClient.send('createProject',+id);
  }

}
