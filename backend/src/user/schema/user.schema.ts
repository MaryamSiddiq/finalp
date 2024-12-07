// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })  // Explicitly define collection name here
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: '' })
  otp: string;

  @Prop({ type: Date, default: null })
  otpExpiresAt: Date;
  @Prop({ type: Boolean, default: false })
  verified: boolean; // Indicates if the user's email is verified
  
}

export const UserSchema = SchemaFactory.createForClass(User);
