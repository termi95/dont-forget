import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Project, ProjectUpdate } from 'src/models/project';
import { LoginUserReq } from 'src/models/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectService } from './project.service';

@Controller('/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/projects')
  getProjects(@Request() req: Request & LoginUserReq): any {
    return this.projectService.getProjects(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getProject(
    @Request() req: Request & LoginUserReq,
    @Body() dto: Project,
  ): Promise<Project> {
    return this.projectService.getProject(dto.id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  addProject(
    @Request() req: Request & LoginUserReq,
    @Body() dto: Project,
  ): Promise<Project | undefined> {
    return this.projectService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  deleteProject(
    @Request() req: Request & LoginUserReq,
    @Body() dto: Project,
  ): Promise<boolean> {
    return this.projectService.delete(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  PatchProject(
    @Request() req: Request & LoginUserReq,
    @Body() dto: ProjectUpdate,
  ): Promise<Project> {
    return this.projectService.patch(dto, req.user.id);
  }
}
