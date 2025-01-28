import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASKS_SERVICES } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICES) private readonly tasksClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksClient.send('createTask', createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksClient.send('findAllTasks', {});
  }

  @Get(':tasksId')
  findOne(@Param('tasksId') tasksId: string) {
    return this.tasksClient.send('findOneTask',+tasksId)
      .pipe(
        catchError( err => { throw new RpcException(err) })
      );
  }

  @Patch(':tasksId')
  update(
    @Param('tasksId', ParseIntPipe) tasksId: number,
    @Body() updateTaskDto: UpdateTaskDto) {

    return this.tasksClient.send('updateTask', {
      id: tasksId,
      ...updateTaskDto,
    }).pipe(
      catchError( err => { throw new RpcException(err)})
    );
  }

  @Delete(':tasksId')
  remove(@Param('tasksId') tasksId: string) {
    return this.tasksClient.send('removeTask',+tasksId)
      .pipe(
        catchError(err => { throw new RpcException(err)})
      );
  }

}
