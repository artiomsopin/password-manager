import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Timestamp } from "mongodb";
import { HydratedDocument, Types, Document } from "mongoose"

export type RecordDocument = HydratedDocument<RecordModel>;

@Schema({ timestamps: true })
export class RecordModel {
    @Prop()
    serviceName: string;

    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop()
    recordId: Types.ObjectId;
}

export const RecordSchema = SchemaFactory.createForClass(RecordModel);