import { ManagerLeaveRequestController } from './manager-leave-request.controller';
import { EmployeeModule } from './../employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leave-request.controller';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from 'src/common/entities/leave-request.entity';


@Module({
    imports: [TypeOrmModule.forFeature([LeaveRequest]),EmployeeModule],
    controllers: [LeaveRequestController,ManagerLeaveRequestController],
    providers: [LeaveRequestService],
    exports: [TypeOrmModule]
})
export class LeaveRequestModule {}
