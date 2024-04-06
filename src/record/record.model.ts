import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { HydratedDocument, Types } from "mongoose"

export type RecordDocument = HydratedDocument<RecordModel>;

@Schema({ timestamps: true })
export class RecordModel {
    @ApiProperty( {example: "1", description: "Unique ID"})
    @Prop({ type: Types.ObjectId })
    id: Types.ObjectId;

    @ApiProperty( {example: "google.com", description: "Service name"})
    @Prop()
    serviceName: string;

    @ApiProperty( {example: "MyLogin", description: "Login"})
    @Prop()
    login: string;

    @ApiPropertyOptional( {example: "password123", description: "Password"})
    @Prop()
    password: string;
}

export const RecordSchema = SchemaFactory.createForClass(RecordModel);