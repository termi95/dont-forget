import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { Project } from 'src/models/project';
import { Task, TaskCreate, TaskProperties, TaskUpdate } from 'src/models/task';
import { LoginUserReq } from 'src/models/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/tasks')
  @HttpCode(200)
  getTasks(@Request() req: Request & LoginUserReq, @Body() dto: Project): any {
    return this.taskService.getTasks(dto.id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getTask(
    @Request() req: Request & LoginUserReq,
    @Body() dto: Task,
  ): Promise<Task> {
    return this.taskService.getTask(dto.id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(200)
  addTask(
    @Request() req: Request & LoginUserReq,
    @Body() dto: TaskCreate,
  ): Promise<Task | undefined> {
    return this.taskService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  deleteTask(
    @Request() req: Request & LoginUserReq,
    @Body() dto: Task,
  ): Promise<boolean> {
    return this.taskService.delete(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/rename')
  PatchTask(
    @Request() req: Request & LoginUserReq,
    @Body() dto: TaskUpdate,
  ): Promise<Task> {
    return this.taskService.patch(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/togleDone')
  PatchTaskTogleDone(@Body() dto: TaskUpdate): Promise<Task> {
    return this.taskService.togleDone(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/priority')
  PatchTaskPriority(@Body() dto: TaskUpdate): Promise<Task> {
    return this.taskService.priority(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/properties')
  PatchProperties(@Body() dto: TaskProperties): Promise<TaskProperties> {
    return this.taskService.properties(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get-properties')
  GetProperties(@Body() dto: TaskProperties): Promise<TaskProperties> {
    return this.taskService.getProperties(dto);
  }
}
