import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Employee } from './employee.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  docName: String;
  @Column()
  description: String;
  

  @Column()
  jointFile: String;

  @ManyToOne(()=> Employee, employee => employee.documents,{onDelete:'CASCADE'})
  @JoinColumn()
  employee : Employee;

  
}