import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Employee } from './employee.entity';

@Entity('specific_requests')
export class SpecificRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subject: String;
  @Column()
  body: String;
  @Column()
  jointFile: String;
  @Column()
  isValidated: boolean;

  @ManyToOne(()=> Employee, employee => employee.leaveRequests,{onDelete:'CASCADE',nullable:true,})
  @JoinColumn()
  employee : Employee;

}