import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientNameNotFoundException extends HttpException {
  constructor(patientName: string) {
    super(`Patient name:${patientName} is not found`, HttpStatus.NOT_FOUND);
  }
}
