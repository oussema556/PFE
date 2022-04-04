import { DocumentModule } from './documents/document.module';
import { EmployeeModule } from './employees/employee.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JobHistoryModule } from './jobHistory/job-history.module';
import { LeaveRequestModule } from './leaveRequests/leave-request.module';
import { SpecificRequestModule } from './specificRequests/specific-request.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeeModule,
    AuthModule,
    JobHistoryModule,
    LeaveRequestModule,
    DocumentModule,
    SpecificRequestModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
