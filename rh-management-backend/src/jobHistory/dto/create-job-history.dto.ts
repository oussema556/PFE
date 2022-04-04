import { ContractType } from '../../common/enums/contract-type.enum';
import { JobTitle } from '../../common/enums/job-title.enum';
import { Employee } from '../../common/entities/employee.entity';
import { IsString, IsPositive, IsOptional } from 'class-validator'
export class CreateJobHistoryDto {
    
    readonly startDate?: Date;
    readonly endDate?: Date;
    @IsPositive()
    readonly salary: number;
    @IsString()
    readonly contractType: ContractType;
    @IsString()
    readonly jobTitle: JobTitle;
    
    @IsOptional()
    readonly employee?: Employee;
}
