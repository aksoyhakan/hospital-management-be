import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientNotFoundException extends HttpException {
  constructor(patientId: number) {
    super(`Patient id:${patientId} is not found`, HttpStatus.NOT_FOUND);
  }
}
