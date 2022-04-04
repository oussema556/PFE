import { Employee } from '../../common/entities/employee.entity';
export class CreateLeaveRequestDto {
    
    readonly startDate?: Date;
    readonly endDate?: Date;
    readonly subject?: String;
    readonly isValidated?: boolean;
    readonly employee?: Employee;
}
