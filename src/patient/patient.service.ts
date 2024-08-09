import { Injectable } from '@nestjs/common';
import { Patient } from './entity/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { PatientResponseDto } from './dto/patient-response';
import { ResponseCreator } from 'utils/ResponseCreater';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreatePatientResponseDto } from './dto/create-patient-response';
import { PatientListResponseDto } from './dto/patient-list-response';
import { PatientNotFoundException } from 'exceptions/patient-exceptions/patient.notfound.exception';
import { PatientNameNotFoundException } from 'exceptions/patient-exceptions/patientname.notfound.exception';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<PatientListResponseDto[]> {
    return (await this.patientRepository.find({ relations: ['user'] })).map(
      (patient) => ResponseCreator.constructPatientListResponse(patient),
    );
  }

  async create(
    patientData: CreatePatientDto,
  ): Promise<CreatePatientResponseDto> {
    const patient = await this.patientRepository.create({
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      birthDate: patientData.birthDate,
      contactInfo: patientData.contactInfo,
      medicalHistory: patientData.medicalHistory,
      currentMedications: patientData.currentMedications,
      user: { id: patientData.userId },
      prescriptionNumber: patientData.prescriptionNumber,
      prescriptionDate: patientData.prescriptionDate,
      medicineName: patientData.medicineName,
      medicineForm: patientData.medicineForm,
      medicineDose: patientData.medicineDose,
      instruction: patientData.instruction,
      description: patientData.description,
    });
    const savedPatient = await this.patientRepository.save(patient);
    return ResponseCreator.constructCreatePatientResponse(
      savedPatient.patientId,
    );
  }

  async update(
    patientId: number,
    updatePatientDto: CreatePatientDto,
  ): Promise<PatientResponseDto> {
    try {
      const searchedPatient = await this.patientRepository.findOne({
        where: { patientId: patientId },
        relations: ['user'],
      });

      Object.assign(searchedPatient, updatePatientDto, {
        user: { id: updatePatientDto.userId },
      });
      const updatedPatient = await this.patientRepository.save(searchedPatient);
      return ResponseCreator.constructPatientResponse(updatedPatient);
    } catch (error) {
      throw new PatientNotFoundException(patientId);
    }
  }

  async delete(id: number): Promise<string> {
    const searchedPatient = await this.findById(id);

    if (!searchedPatient) throw new PatientNotFoundException(id);
    await this.patientRepository.delete(id);
    return 'OK';
  }

  async findById(patientId: number): Promise<PatientResponseDto> {
    try {
      const searchedPatient = await this.patientRepository.findOne({
        where: { patientId },
        relations: ['user'],
      });
      return ResponseCreator.constructPatientResponse(searchedPatient);
    } catch (error) {
      throw new PatientNotFoundException(patientId);
    }
  }

  async getByName(firstName: string) {
    return await this.patientRepository.findOne({
      where: {
        firstName,
      },
    });
  }

  async getQueryName(firstName: string): Promise<PatientResponseDto> {
    try {
      const searchedPatient = await this.patientRepository.findOne({
        where: {
          firstName: Raw(
            (alias) => `LOWER(${alias}) LIKE LOWER('%${firstName}%')`,
          ),
        },
        relations: ['user'],
      });
      return ResponseCreator.constructPatientResponse(searchedPatient);
    } catch (error) {
      throw new PatientNameNotFoundException(firstName);
    }
  }
}
