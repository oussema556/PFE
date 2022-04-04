import { faker } from '@faker-js/faker';
import { EmployeeService } from './../employees/employee.service';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveRequest } from 'src/common/entities/leave-request.entity';

@Injectable()
export class LeaveRequestService {


    constructor(
        @InjectRepository(LeaveRequest)
        private readonly leaveRequestRepository: Repository<LeaveRequest>,
        private readonly employeeService : EmployeeService) { }

    async create(createLeaveRequest: CreateLeaveRequestDto){
        const leaveRequest = await this.leaveRequestRepository.create(createLeaveRequest);

        return await this.leaveRequestRepository.save(leaveRequest);
    }
    async update(id:number,updateLeaveRequest: UpdateLeaveRequestDto){
        const leaveRequestExists = await this.leaveRequestRepository.preload({
            id: +id,
            ...updateLeaveRequest,
        });
        if (!leaveRequestExists) {
            throw new NotFoundException('leaveRequest not found!!!')
        }
        return await this.leaveRequestRepository.save(leaveRequestExists);
    }
    async delete(id : number){
        const leaveRequest = await this.leaveRequestRepository.findOne(id);
        this.leaveRequestRepository.remove(leaveRequest);
    }
    async getOne(id : number){
        const leaveRequestExists = await this.leaveRequestRepository.findOne(id);
        if (!leaveRequestExists) {
            throw new NotFoundException('leaveRequest not found!!!')
        }
        return leaveRequestExists;
    }
    async getByEmployeeId(employeeId: number){
        return await this.leaveRequestRepository.find({where:{employee:{id:employeeId}}})
    }
    async getByManagerId(id:number,isValid:boolean){
        const manager = await this.employeeService.findOneById(id);
        const ids = [];
        for (let i = 0; i < manager.employees.length; i++) {
            ids.push(manager.employees[i].id);
        }
        return await this.leaveRequestRepository.find({where:{employee:{id:In(ids)},isValidated:isValid},order:{created_at:'DESC'},relations:['employee']});
    }
    async validateLeaveRequest(id: number) {
        const leaveRequestExists = await this.leaveRequestRepository.findOne(id);
        leaveRequestExists.isValidated = true;
        return this.leaveRequestRepository.save(leaveRequestExists);
    }
    async generateLeaveRequests() {
        for (const _ of Array.from({ length: 4 })) {
            const leaveRequest = this.leaveRequestRepository.create({
                subject: 'subject',
                startDate : faker.date.past(),
                endDate : faker.date.past(),
                employee:{
                    id : 7
                }
            });
            await this.leaveRequestRepository.save(leaveRequest);
        }
        for (const _ of Array.from({ length: 4 })) {
            const leaveRequest = this.leaveRequestRepository.create({
                subject: 'subject',
                startDate : faker.date.past(),
                endDate : faker.date.past(),
                employee:{
                    id : 8
                }
            });
            await this.leaveRequestRepository.save(leaveRequest);
        }
        for (const _ of Array.from({ length: 4 })) {
            const leaveRequest = this.leaveRequestRepository.create({
                subject: 'subject',
                startDate : faker.date.past(),
                endDate : faker.date.past(),
                employee:{
                    id : 9
                }
            });
            await this.leaveRequestRepository.save(leaveRequest);
        }
        for (const _ of Array.from({ length: 4 })) {
            const leaveRequest = this.leaveRequestRepository.create({
                subject: 'subject',
                startDate : faker.date.past(),
                endDate : faker.date.past(),
                employee:{
                    id : 10
                }
            });
            await this.leaveRequestRepository.save(leaveRequest);
        }
    }
}
