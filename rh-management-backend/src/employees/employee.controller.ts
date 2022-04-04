import { Employee } from '../common/entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Controller, Post, Body, Get, Param, Patch, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards, Req, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/common/helper/helper';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService : EmployeeService){}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createEmployee(@Body() createEmployeeDto : CreateEmployeeDto ){
        return this.employeeService.create(createEmployeeDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOneEmployee(@Param('id') id: number){
        return this.employeeService.findOneById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    updateEmployee(@Param('id') id: number,@Body() updateEmployeeDto: UpdateEmployeeDto){
        return this.employeeService.update(id,updateEmployeeDto);
    }

    @Post('uploadProfilPic/:employeeId')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: Helper.destinationPath,
                filename: Helper.customFileName,
            }),
        }),
    )
    uploadProfilPic(@UploadedFile() file : Express.Multer.File,@Param('employeeId') employeeId:number){

        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return this.employeeService.uploadProfilImage(employeeId,file.filename);
    }
    @Get('profilImage/:imgName')
    findProfileImage(@Param('imgName') imgName,@Res()res):Observable<Object>{
        return of(res.sendFile(join(process.cwd(),'uploads/profilImages/' + imgName)));
    }
}