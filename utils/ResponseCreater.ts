import { CreateUserResponseDto } from 'src/auth/dto/create-user-response';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response';
import { CreatePatientResponseDto } from 'src/patient/dto/create-patient-response';
import { PatientResponseDto } from 'src/patient/dto/patient-response';
import { PatientListResponseDto } from 'src/patient/dto/patient-list-response';
import { Patient } from 'src/patient/entity/patient.entity';

export class ResponseCreator {
  public static constructLoginResponse(
    id: number,
    name: string,
    token: string,
  ) {
    return new LoginUserResponseDto(id, name, token);
  }

  public static constructRegistResponse(userId: number) {
    return new CreateUserResponseDto('success', userId);
  }

  public static constructCreatePatientResponse(patientId: number) {
    return new CreatePatientResponseDto('success', patientId);
  }

  public static constructPatientResponse(patient: Patient) {
    return new PatientResponseDto(
      patient.patientId,
      patient.firstName,
      patient.lastName,
      patient.birthDate,
      patient.contactInfo,
      patient.currentMedications,
      patient.medicalHistory,
      patient.user.name,
      patient.prescriptionNumber,
      patient.prescriptionDate,
      patient.medicineName,
      patient.medicineForm,
      patient.medicineDose,
      patient.instruction,
      patient.description,
    );
  }

  public static constructPatientListResponse(patient: Patient) {
    return new PatientListResponseDto(
      patient.patientId,
      patient.firstName,
      patient.lastName,
      patient.birthDate,
      patient.contactInfo,
      patient.user.name,
    );
  }
}
