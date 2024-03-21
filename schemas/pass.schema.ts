import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PassDocument = HydratedDocument<Pass>;

@Schema()
export class Pass {
  @Prop()
  id: number;

  @Prop()
  levelId: number;

  @Prop()
  speed: number;

  @Prop()
  player: string;

  @Prop()
  vidTitle: string;

  @Prop()
  vidLink: string;

  @Prop()
  vidUploadTime: string;

  @Prop()
  is12K: boolean;

  @Prop()
  isNoHoldTap: boolean;

  @Prop()
  judgements: number[];

  @Prop({ select: false })
  _id: string;

  @Prop({ select: false })
  __v: string;
}

export const PassSchema = SchemaFactory.createForClass(Pass);
