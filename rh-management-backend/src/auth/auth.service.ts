import { AuthDto } from './dto/auth.dto';
import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/common/entities/employee.entity';
import { EmployeeService } from 'src/employees/employee.service';

@Injectable()
export class AuthService {
  constructor(private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService) { }

  private async validate(authDto : AuthDto): Promise<Employee> {
    return await this.employeeService.findByEmail(authDto.email);
  }

  async login(authDto : AuthDto): Promise<any | { status: number }> {
    const employee = await this.validate(authDto);
    // Because they have same error message
    if ((!employee) || (!await bcrypt.compare(authDto.password, employee.password))) {
      throw new UnauthorizedException('invalid credentials!!!');
    }

    const jwt = await this.jwtService.signAsync({
      id: employee.id,
      jobTitle:employee.jobTitle,
      role: employee.role,
      firstName: employee.firstName,
      lastName: employee.lastName
    })

    return {
      token: jwt,
      status: {
        status: 200,
        message: "logged in successfully!!"
      }
    }
  };
}
