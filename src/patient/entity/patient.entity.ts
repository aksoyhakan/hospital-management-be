import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ schema: 'hospital', name: 'patient' })
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  patientId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  contactInfo: string;

  @Column({ nullable: true })
  medicalHistory: string;

  @Column({ nullable: true })
  currentMedications: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  prescriptionNumber: string;

  @Column()
  prescriptionDate: Date;

  @Column()
  medicineName: string;

  @Column({ nullable: true })
  medicineForm: string;

  @Column({ nullable: true })
  medicineDose: string;

  @Column()
  instruction: string;

  @Column({ nullable: true })
  description: string;
}
