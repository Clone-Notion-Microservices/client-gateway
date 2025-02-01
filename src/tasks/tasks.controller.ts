import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASKS_SERVICES } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from '../common';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICES) private readonly tasksClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksClient.send('createTask', createTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksClient.send('findAllTasks', paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':tasksId')
  findOne(@Param('tasksId') tasksId: string) {
    return this.tasksClient.send('findOneTask', +tasksId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':tasksId')
  update(
    @Param('tasksId', ParseIntPipe) tasksId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksClient
      .send('updateTask', {
        id: tasksId,
        ...updateTaskDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Delete(':tasksId')
  remove(@Param('tasksId') tasksId: string) {
    return this.tasksClient.send('removeTask', +tasksId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
