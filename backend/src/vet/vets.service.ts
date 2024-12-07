// src/vets/vet.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vet } from './vet.entity';


@Injectable()
export class VetService {
  constructor(@InjectModel('Vet') private readonly vetModel: Model<Vet>) {}

  async findAll(): Promise<Vet[]> {
    return this.vetModel.find().exec();
  }

  async findOne(id: string): Promise<Vet> {
    return this.vetModel.findById(id).exec();
  }

  async create(vetData: Partial<Vet>): Promise<Vet> {
    const newVet = new this.vetModel(vetData);
    return newVet.save();
  }

  async update(id: string, updateData: Partial<Vet>): Promise<Vet> {
    return this.vetModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Vet> {
    return this.vetModel.findByIdAndDelete(id).exec();
  }
}
