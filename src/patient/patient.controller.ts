import {
  Body,
  UseGuards,
  Controller,
  Delete,
  UseInterceptors,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.patientService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('search')
  getNameQuery(@Query('name') name: string) {
    return this.patientService.getQueryName(name);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getById(@Param('id') patientId: number) {
    return this.patientService.findById(patientId);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      birthDate: Date;
      contactInfo: string;
      medicalHistory: string;
      currentMedications: string;
      userId: number;
      prescriptionNumber: string;
      prescriptionDate: Date;
      medicineName: string;
      medicineForm: string;
      medicineDose: string;
      instruction: string;
      description: string;
    },
  ) {
    return this.patientService.create({
      ...body,
    });
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('patient'))
  update(
    @Param('id') patientId: number,
    @Body()
    body: {
      firstName: string;
      lastName: string;
      birthDate: Date;
      contactInfo: string;
      medicalHistory: string;
      currentMedications: string;
      userId: number;
      prescriptionNumber: string;
      prescriptionDate: Date;
      medicineName: string;
      medicineForm: string;
      medicineDose: string;
      instruction: string;
      description: string;
    },
  ) {
    return this.patientService.update(patientId, {
      ...body,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') patientId: number) {
    return this.patientService.delete(patientId);
  }
}
