import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PassDocument = HydratedDocument<Pass>;

@Schema()
export class Pass {
  @Prop()
  levelId: number;

  @Prop()
  player: string;

  @Prop()
  vidTitle: string;

  @Prop()
  vidLink: string;

  @Prop()
  vidUploadTime: string;

  @Prop({ select: false })
  _id: string;

  @Prop({ select: false })
  __v: string;
}

export const PassSchema = SchemaFactory.createForClass(Pass);
