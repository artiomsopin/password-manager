import { Injectable } from "@nestjs/common";
import { Prop } from "@nestjs/mongoose";
import { Timestamp } from "mongodb";
import { Types } from "mongoose"

@Injectable()
export class RecordModel extends Timestamp{
    @Prop()
    serviceName: string;

    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop()
    userId: Types.ObjectId;
}