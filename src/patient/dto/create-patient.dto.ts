import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;

  @IsString()
  @IsOptional()
  medicalHistory: string;

  @IsString()
  @IsOptional()
  currentMedications: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  prescriptionNumber: string;

  @IsString()
  @IsNotEmpty()
  prescriptionDate: Date;

  @IsString()
  @IsNotEmpty()
  medicineName: string;

  @IsNumber()
  @IsOptional()
  medicineForm: string;

  @IsString()
  @IsOptional()
  medicineDose: string;

  @IsString()
  @IsNotEmpty()
  instruction: string;

  @IsString()
  @IsOptional()
  description: string;
}
