import { Employee } from '../common/entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Controller, Post, Body, Get, Param, Patch, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards, Req, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager/employees')
export class ManagerEmployeeController {
    constructor(private readonly employeeService : EmployeeService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('searchByManagerId/:managerId')
    async searchWithManagerId(
      @Param('managerId') managerId: number,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): Promise<Pagination<Employee>> {
      console.log('managerId',managerId);
      limit = limit > 100 ? 100 : limit;
      return await this.employeeService.searchByManagerId({page,limit},managerId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search/:name/:managerId')
    async search(
      @Param('managerId') managerId: number,
      @Param('name') name: string,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): Promise<Pagination<Employee>> {
      limit = limit > 100 ? 100 : limit;
      return this.employeeService.search({page,limit},managerId,name);
    }
}