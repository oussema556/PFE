import { JobHistory } from './../common/entities/job-history.entity';
import { JobHistoryService } from './job-history.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { Employee } from '../common/entities/employee.entity';
import { Controller, Post, Body, Get, Param, Patch, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards, Req } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AuthGuard } from '@nestjs/passport';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Controller('jobHistory')
export class JobHistoryController {
    constructor(private readonly jobHistoryService : JobHistoryService){}



    @UseGuards(AuthGuard('jwt'))
    @Get('searchByEmployeeId/:employeeId')
    async searchWithEmployeeId(
      @Param('employeeId') employeeId: number,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): Promise<Pagination<JobHistory>> {
      limit = limit > 100 ? 100 : limit;
      return await this.jobHistoryService.findByEmployeeId({page,limit},employeeId);
    }

    
    @Get('fake/employees')
    async findAllEmployees(){
      await this.jobHistoryService.generateJobHistory();
      return await this.jobHistoryService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    updateEmployee(@Param('id') id: number,@Body() updateJobHistoryDto: UpdateJobHistoryDto){
        return this.jobHistoryService.update(id,updateJobHistoryDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteEmployee(@Param('id') id: number){
        return this.jobHistoryService.remove(id);
    }
    
}