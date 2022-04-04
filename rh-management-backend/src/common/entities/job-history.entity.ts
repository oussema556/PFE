import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { ContractType } from "../enums/contract-type.enum";
import { JobTitle } from "../enums/job-title.enum";
import { Employee } from './employee.entity';

@Entity('jobHistory')
export class JobHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @Column()
  salary: number;

  @Column()
  contractType: ContractType;

  @Column()
  jobTitle: JobTitle;

  @ManyToOne(()=> Employee, employee => employee.jobHistory,{onDelete:'CASCADE'})
  @JoinColumn()
  employee : Employee;
  
}