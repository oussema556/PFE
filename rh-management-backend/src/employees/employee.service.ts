import { JobHistoryService } from './../jobHistory/job-history.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from '../common/entities/employee.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ILike, Like, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import faker from '@faker-js/faker';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractType } from 'src/common/enums/contract-type.enum';
import { JobTitle } from 'src/common/enums/job-title.enum';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class EmployeeService {
    
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        @Inject(forwardRef(() => JobHistoryService))
        private readonly jobHistoryService: JobHistoryService) { }




    async paginate(options: IPaginationOptions): Promise<Pagination<Employee>> {
        
        return paginate<Employee>(this.employeeRepository, options,{relations:['manager'],where:[{role:Role.DEVELOPER},{role:Role.MANAGER}]});
    }

    async findByEmail(email: String){
        const employee = await this.employeeRepository.findOne({email: email},{select:["password","id","jobTitle","role","firstName","lastName"]});
        if (!employee) {
            throw new NotFoundException('employee not found!!!');
        }
        return employee;
    }

    async search(options: IPaginationOptions,managerId:number,name:string): Promise<Pagination<Employee>> {
        return paginate<Employee>(this.employeeRepository, options,{relations:['manager'], where: [{manager: {id: managerId},firstName:ILike(`${name}%`)},
                {manager: {id: managerId},lastName:ILike(`${name}%`)}]});
    }

    async searchByName(options: IPaginationOptions,name:string): Promise<Pagination<Employee>> {
        return paginate<Employee>(this.employeeRepository, options,{relations:['manager'], where: [{firstName:ILike(`${name}%`)},{lastName:ILike(`${name}%`)}]});
    }
    async searchByManagerId(options: IPaginationOptions,managerId:number): Promise<Pagination<Employee>> {
        return paginate<Employee>(this.employeeRepository, options,{relations:['manager'], where: {manager: {id: managerId}}});
    }


    async findAll() {
        return await this.employeeRepository.find({relations:['manager']});
    }
    async create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
        const emp = this.employeeRepository.create(createEmployeeDto);
        return await this.employeeRepository.save(emp);

    }
    async findOneById(id: number) {
        const employee = await this.employeeRepository.findOne(id,{relations:['manager','jobHistory','employees','leaveRequests']});
        if (!employee) {
            throw new NotFoundException('employee not found!!!');
        }
        return employee;
    }
    async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        const employeeExists = await this.employeeRepository.preload({
            id: +id,
            ...updateEmployeeDto,
        });
        if (!employeeExists) {
            throw new NotFoundException('employee not found!!!')
        }
        return await this.employeeRepository.save(employeeExists);
    }
    async updateJobHistory(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        const employeeExists = await this.findOneById(id);
        if (!employeeExists) {
            throw new NotFoundException('employee not found!!!')
        }
        const jobHistory = await this.jobHistoryService.create({
            startDate: employeeExists.startDate,
            endDate: new Date(),
            salary:employeeExists.currentSalary,
            contractType:employeeExists.contractType,
            jobTitle:employeeExists.jobTitle
        })
        employeeExists.jobTitle=updateEmployeeDto.jobTitle;
        employeeExists.contractType=updateEmployeeDto.contractType;
        employeeExists.currentSalary=updateEmployeeDto.currentSalary;
        employeeExists.startDate= new Date();
        employeeExists.jobHistory.push(jobHistory);

        return await this.employeeRepository.save(employeeExists);
    }
    async remove(id: number) {
        const emp = await this.findOneById(id);
        this.employeeRepository.remove(emp);
    }
    async getManagers(){
        return this.employeeRepository.find({where : {jobTitle:JobTitle.MANAGER},relations:['manager','jobHistory','employees','leaveRequests']});
    }

    async uploadProfilImage(employeeId:number,imageName:String){
        const employee = await this.findOneById(employeeId);
        if (!employee) {
            throw new NotFoundException('employee not found!!!');
        }
        employee.profilPic = imageName;
        return await this.employeeRepository.save(employee);
    }

    async generateAdmins() {
        for (const _ of Array.from({ length: 2 })) {
            const emp = this.employeeRepository.create({
                firstName: faker.name.firstName(),
                lastName : faker.name.lastName(),
                startDate : faker.date.past(),
                birthDay : faker.date.past(),
                email : faker.internet.email(),
                contractType : ContractType.CDD,
                role:Role.ADMINISTRATOR,
                jobTitle : JobTitle.ADMINISTRATOR,
                phone:faker.datatype.number({ min: 10000000, max: 99999999 }),
                currentSalary : faker.datatype.number(),
                password : 'password'
            });
            await this.employeeRepository.save(emp);
        }
    }
    async generateManagers() {
        for (const _ of Array.from({ length: 4 })) {
            const emp = this.employeeRepository.create({
                firstName: faker.name.firstName(),
                lastName : faker.name.lastName(),
                startDate : faker.date.past(),
                birthDay : faker.date.past(),
                email : faker.internet.email(),
                contractType : ContractType.CDD,
                role:Role.MANAGER,
                jobTitle : JobTitle.MANAGER,
                phone:faker.datatype.number({ min: 10000000, max: 99999999 }),
                currentSalary : faker.datatype.number(),
                password : 'password',
                manager:{
                    id : 1
                }
            });
            await this.employeeRepository.save(emp);
        }
    }
    async generateEmployees() {
        for (const _ of Array.from({ length: 4 })) {
            const emp = this.employeeRepository.create({
                firstName: faker.name.firstName(),
                lastName : faker.name.lastName(),
                startDate : faker.date.past(),
                birthDay : faker.date.past(),
                email : faker.internet.email(),
                contractType : ContractType.CDD,
                role:Role.DEVELOPER,
                jobTitle : JobTitle.BACKEND_DEV,
                phone:faker.datatype.number({ min: 10000000, max: 99999999 }),
                currentSalary : faker.datatype.number(),
                password : 'password',
                manager:{
                    id : 3
                }
            });
            await this.employeeRepository.save(emp);
        }
        for (const _ of Array.from({ length: 4 })) {
            const emp = this.employeeRepository.create({
                firstName: faker.name.firstName(),
                lastName : faker.name.lastName(),
                startDate : faker.date.past(),
                birthDay : faker.date.past(),
                email : faker.internet.email(),
                contractType : ContractType.CDD,
                role:Role.DEVELOPER,
                jobTitle : JobTitle.FRONTEND_DEV,
                phone:faker.datatype.number({ min: 10000000, max: 99999999 }),
                currentSalary : faker.datatype.number(),
                password : 'password',
                manager:{
                    id : 4
                }
            });
            await this.employeeRepository.save(emp);
        }
        for (const _ of Array.from({ length: 4 })) {
            const emp = this.employeeRepository.create({
                firstName: faker.name.firstName(),
                lastName : faker.name.lastName(),
                startDate : faker.date.past(),
                birthDay : faker.date.past(),
                email : faker.internet.email(),
                contractType : ContractType.CDD,
                role:Role.DEVELOPER,
                jobTitle : JobTitle.FULLSTACK_DEV,
                phone:faker.datatype.number({ min: 10000000, max: 99999999 }),
                currentSalary : faker.datatype.number(),
                password : 'password',
                manager:{
                    id : 5
                }
            });
            await this.employeeRepository.save(emp);
        }
    }
    
}
