import { EmployeeService } from 'src/employees/employee.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmployeeModule } from 'src/employees/employee.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        EmployeeModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
              secret: 'rh_management_secret_key2022',
              signOptions : {expiresIn:'1d'}
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
