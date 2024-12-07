// src/vets/vet.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VetSchema } from './schema/vet.schema';
import { VetController } from './vets.controller';
import { VetService } from './vets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vet', schema: VetSchema }]),
  ],
  controllers: [VetController],
  providers: [VetService],
})
export class VetModule {}
