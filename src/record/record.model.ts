import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Document } from "mongoose"

export type RecordDocument = HydratedDocument<RecordModel>;

@Schema({ timestamps: true })
export class RecordModel {
    @Prop({ type: Types.ObjectId })
    id: Types.ObjectId;

    @Prop()
    serviceName: string;

    @Prop()
    login: string;

    @Prop()
    password: string;
}

export const RecordSchema = SchemaFactory.createForClass(RecordModel);