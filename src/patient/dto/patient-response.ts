export class PatientResponseDto {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private birthDate: Date,
    private contactInfo: string,
    private medicalHistory: string,
    private currentMedications: string,
    private doctorName: string,
    private prescriptionNumber: string,
    private prescriptionDate: Date,
    private medicineName: string,
    private medicineForm: string,
    private medicineDose: string,
    private instruction: string,
    private description: string,
  ) {}
}
