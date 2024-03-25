import { BadRequestException } from '@nestjs/common';

type ErrorDTO = {
  query?: string;
  parameters?: string[];
  driverError?: object;
  length?: number;
  severity?: string;
  code?: string;
  detail?: string;
  table?: string;
  constraint?: string;
};

export async function validateUserUniqueConstraint(error: ErrorDTO) {
  if (error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') {
    throw new BadRequestException('This email is already beaing used.');
  }

  if (error.constraint === 'UQ_8e1f623798118e629b46a9e6299') {
    throw new BadRequestException('This phone is already beaing used.');
  }
}
