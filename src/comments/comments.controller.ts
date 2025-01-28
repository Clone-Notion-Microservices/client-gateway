import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TASKS_SERVICES } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICES) private readonly tasksClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateCommentDto) {
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
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateCommentDto) {
    return this.tasksClient.send('createProject', {});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksClient.send('createProject',+id);
  }

}

