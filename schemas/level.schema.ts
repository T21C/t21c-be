import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LevelDocument = HydratedDocument<Level>;

@Schema()
export class Level {
  @Prop()
  id: number;

  @Prop()
  song: string;

  @Prop()
  artist: string;

  @Prop()
  creator: string;

  @Prop()
  charter: string;

  @Prop()
  vfxer: string;

  @Prop()
  team: string;

  @Prop()
  diff: number;

  @Prop()
  legacyDiff: number;

  @Prop()
  pguDiff: string;

  @Prop()
  pguDiffNum: number;

  @Prop()
  newDiff: number;

  @Prop()
  pdnDiff: number;

  @Prop()
  realDiff: number;

  @Prop()
  baseScore: number;

  @Prop()
  isCleared: boolean;

  @Prop()
  clears: number;

  @Prop()
  vidLink: string;

  @Prop()
  dlLink: string;

  @Prop()
  workshopLink: string;

  @Prop()
  publicComments: string;

  @Prop({ select: false })
  _id: string;

  @Prop({ select: false })
  __v: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
