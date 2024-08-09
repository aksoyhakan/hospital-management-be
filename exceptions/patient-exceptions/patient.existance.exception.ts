import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientNameExistinceException extends HttpException {
  constructor(patientName: string) {
    super(`${patientName} is already used`, HttpStatus.BAD_REQUEST);
  }
}
