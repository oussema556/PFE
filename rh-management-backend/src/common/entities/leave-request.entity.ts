import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Employee } from './employee.entity';

@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subject: String;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  created_at:Date;
  @Column({default: false})
  isValidated: boolean;

  @ManyToOne(()=> Employee, employee => employee.leaveRequests,{onDelete:'CASCADE'})
  @JoinColumn()
  employee : Employee;
}