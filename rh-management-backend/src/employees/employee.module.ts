import { AdminEmployeeController } from './employee-admin.controller';
import { ManagerEmployeeController } from './employee-manager.controller';
import { JobHistoryModule } from './../jobHistory/job-history.module';
import { Employee } from 'src/common/entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Employee]),JobHistoryModule],
    controllers: [EmployeeController,ManagerEmployeeController,AdminEmployeeController],
    providers: [EmployeeService],
    exports: [TypeOrmModule,EmployeeService]
})
export class EmployeeModule {}
