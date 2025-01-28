import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PROJECT_SERVICES } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { catchError } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECT_SERVICES) private readonly projectsClient: ClientProxy,
  ) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsClient.send('createProject', createProjectDto);
  }

  @Get()
  getProjects(@Query() paginationDto: PaginationDto) {
    return this.projectsClient.send('findAllProjects', paginationDto);
  }

  @Get(':projectId')
  async getOne(@Param('projectId') id: string) {

    return this.projectsClient.send('findOneProject', +id)
      .pipe(
        catchError( err => { throw new RpcException(err) })
      );
  }

  @Patch(':projectId')
  patchProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsClient.send('updateProject', {
      id: projectId,
      ...updateProjectDto,
    }).pipe(
      catchError( err => { throw new RpcException(err)})
    );
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId: string) {
    return this.projectsClient.send('removeProject', +projectId)
      .pipe(
        catchError(err => { throw new RpcException(err)})
      );
  }
}
