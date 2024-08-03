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

  @Prop()
  rankedScore?: number;

  @Prop()
  generalScore?: number;

  @Prop()
  averageXacc?: number;

  @Prop()
  totalPasses?: number;

  @Prop()
  universalPasses?: number;

  @Prop()
  wfPasses?: number;

  @Prop()
  bestDiff?: string;

  @Prop()
  best12KDiff?: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
