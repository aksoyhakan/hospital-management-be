export class PatientListResponseDto {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private birthDate: Date,
    private contactInfo: string,
    private doctorName: string,
  ) {}
}
