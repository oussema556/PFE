import { UpdateJobHistoryDto } from './dto/update-job-history.dto';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { JobHistory } from './../common/entities/job-history.entity';
import { Injectable } from '@nestjs/common';
import { ILike, Like, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import faker from '@faker-js/faker';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractType } from 'src/common/enums/contract-type.enum';
import { JobTitle } from 'src/common/enums/job-title.enum';

@Injectable()
export class JobHistoryService {
    
    constructor(
        @InjectRepository(JobHistory)
        private readonly jobHistoryRepository: Repository<JobHistory>,) { }



    async findByEmployeeId(options: IPaginationOptions,employeeId: number): Promise<Pagination<JobHistory>>{
        
        return paginate<JobHistory>(this.jobHistoryRepository, options,{where: {employee:{id:employeeId}},order:{endDate:'ASC'}});
    }


    async findAll() {
        return await this.jobHistoryRepository.find({relations:['employee']});
    }
    async create(createJobHistoryDto: CreateJobHistoryDto): Promise<JobHistory> {
        const emp = this.jobHistoryRepository.create(createJobHistoryDto);
        return await this.jobHistoryRepository.save(emp);
    }
    
    async update(id: number, updateJobHistoryDto: UpdateJobHistoryDto) {
        const jobHistoryExists = await this.jobHistoryRepository.preload({
            id: +id,
            ...updateJobHistoryDto,
        });
        if (!jobHistoryExists) {
            throw new NotFoundException('jobHistory not found!!!')
        }
        return await this.jobHistoryRepository.save(jobHistoryExists);
    }
    
    async remove(id: number) {
        const jobHistory = await this.jobHistoryRepository.findOne(id);
        this.jobHistoryRepository.remove(jobHistory);
    }
    async generateJobHistory() { 
        for (const _ of Array.from({ length: 5 })) {
            const jobHistory = this.jobHistoryRepository.create({
                startDate : faker.date.past(),
                endDate : faker.date.past(),
                contractType : ContractType.CDD,
                jobTitle : JobTitle.BACKEND_DEV,
                salary : faker.datatype.number(),
                employee:{
                    id: 5
                }
            });
            await this.jobHistoryRepository.save(jobHistory);
        }
    }
    
    
}
