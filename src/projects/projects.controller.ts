import { Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { PROJECT_SERVICES } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECT_SERVICES) private readonly projectsClient: ClientProxy,
  ) {}

  @Post()
  createProject() {
    return 'Create a project';
  }

  @Get()
    getProjects(@Query() paginationDto: PaginationDto) {
      return this.projectsClient.send('findAllProjects', paginationDto);
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId: string) {
    return 'Delete project number ' + projectId;
  }

  @Patch(':projectId')
  patchProject(@Param('projectId') projectId: string) {
    return 'Patch project number ' + projectId;
  }





}
