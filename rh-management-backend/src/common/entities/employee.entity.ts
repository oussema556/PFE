import { JobHistory } from './job-history.entity';
import { SpecificRequest } from './specific-request.entity';
import { LeaveRequest } from './leave-request.entity';
import { ContractType } from '../enums/contract-type.enum';
import { JobTitle } from '../enums/job-title.enum';
import { BeforeInsert, Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Document } from './document.entity';
import { Role } from '../enums/role.enum';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: String;
  @Column()
  lastName: String;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  birthDay: Date;
  @Column({ unique: true })
  email: String;
  @Column()
  phone:number;
  @Column()
  contractType: ContractType;
  @Column({default:'default.jpg'})
  profilPic:String;
  @Column()
  role: Role;
  @Column()
  jobTitle: JobTitle;
  @Column()
  currentSalary: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password,10);
  }
  @Column({select: false})
  password: string;

  @ManyToOne(()=> Employee, employee => employee.employees,{onDelete:'SET NULL',nullable:true,})
  @JoinColumn()
  manager : Employee;

  @OneToMany(()=> Employee, employee => employee.manager)
  employees: Employee[];

  @OneToMany(()=> LeaveRequest, leaveRequest => leaveRequest.employee)
  leaveRequests: LeaveRequest[];
  
  @OneToMany(()=> SpecificRequest, specificRequest => specificRequest.employee)
  specificRequests: SpecificRequest[];

  @OneToMany(()=> Document, document => document.employee)
  documents: Document[];

  @OneToMany(()=> JobHistory, jobHistory => jobHistory.employee)
  jobHistory: JobHistory[];
  
}