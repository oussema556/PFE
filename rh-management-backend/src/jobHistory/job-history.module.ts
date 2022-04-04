import { JobHistory } from './../common/entities/job-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobHistoryService } from './job-history.service';
import { JobHistoryController } from './job-history.controller';
import { forwardRef, Module } from '@nestjs/common';
import { EmployeeModule } from 'src/employees/employee.module';


@Module({
    imports: [TypeOrmModule.forFeature([JobHistory])],
    controllers: [JobHistoryController],
    providers: [JobHistoryService],
    exports: [TypeOrmModule,JobHistoryService]
})
export class JobHistoryModule {}
