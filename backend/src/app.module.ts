// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ImageModule } from './model/image.module';
import { ImageModulee } from './image/image.module';
import { VetModule } from './vet/vets.module';




@Module({
  imports: [
    // Connect to MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/fypcollection'), // Replace with your MongoDB URL if different
    UserModule,
    //ImageModule,
    ImageModulee,
    VetModule,
  ],
})
export class AppModule {}
