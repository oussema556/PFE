import { Employee } from '../common/entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Controller, Post, Body, Get, Param, Patch, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards, Req, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/employees')
export class AdminEmployeeController {
    constructor(private readonly employeeService : EmployeeService){}


    //STILL FRONT
    @UseGuards(AuthGuard('jwt'))
    @Post()
    createEmployee(@Body() createEmployeeDto : CreateEmployeeDto ){
        return this.employeeService.create(createEmployeeDto);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async index(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Employee>> {
      limit = limit > 100 ? 100 : limit;
      return this.employeeService.paginate({page,limit,});
    }

    //STILL FRONT
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

    //STILL FRONT
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

    //STILL FRONT
    @UseGuards(AuthGuard('jwt'))
    @Get('search/:name')
    async searchWithName(
      @Param('name') name: string,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): Promise<Pagination<Employee>> {
      limit = limit > 100 ? 100 : limit;
      return this.employeeService.searchByName({page,limit},name);
    }
    
    @Get('fake/admins')
    async findAll(){
      await this.employeeService.generateAdmins();
      return await this.employeeService.findAll();
    }
    @Get('fake/managers')
    async findAllManagers(){
      await this.employeeService.generateManagers();
      return await this.employeeService.findAll();
    }
    @Get('fake/employees')
    async findAllEmployees(){
      await this.employeeService.generateEmployees();
      return await this.employeeService.findAll();
    }


    @UseGuards(AuthGuard('jwt'))
    @Patch('jobHistory/:id')
    updateJoHistory(@Param('id') id: number,@Body() updateEmployeeDto: UpdateEmployeeDto){
        return this.employeeService.updateJobHistory(id,updateEmployeeDto);
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteEmployee(@Param('id') id: number){
        return this.employeeService.remove(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('managersList/get')
    getManagers(){
      return this.employeeService.getManagers();
    }
}