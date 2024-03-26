import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  isBanned: boolean;

  @Prop({ select: false })
  _id: string;

  @Prop({ select: false })
  __v: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
