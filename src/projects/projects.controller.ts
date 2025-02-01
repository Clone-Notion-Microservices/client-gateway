import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PROJECT_SERVICES } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECT_SERVICES) private readonly projectsClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsClient.send('createProject', createProjectDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProjects(@Query() paginationDto: PaginationDto) {
    return this.projectsClient.send('findAllProjects', paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':projectId')
  getOne(@Param('projectId') id: string) {
    return this.projectsClient.send('findOneProject', +id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':projectId')
  patchProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsClient
      .send('updateProject', {
        id: projectId,
        ...updateProjectDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId: string) {
    return this.projectsClient.send('removeProject', +projectId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
