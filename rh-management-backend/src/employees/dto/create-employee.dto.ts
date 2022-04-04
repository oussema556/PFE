import { ContractType } from './../../common/enums/contract-type.enum';
import { JobTitle } from './../../common/enums/job-title.enum';
import { Employee } from '../../common/entities/employee.entity';
import { IsString, IsEmail, IsNotEmpty, IsPositive, IsDate, IsOptional } from 'class-validator'
export class CreateEmployeeDto {
    @IsString()
    readonly firstName: String;
    @IsString()
    readonly lastName: String;
    readonly startDate?: Date;
    readonly birthDay?: Date;
    @IsEmail()
    readonly email: String;
    readonly phone:number;
    @IsString()
    readonly contractType: ContractType;
    @IsString()
    readonly jobTitle?: JobTitle;
    @IsPositive()
    readonly currentSalary: number;
    @IsNotEmpty()
    readonly password: string;
    @IsOptional()
    readonly manager?: Employee;
}
