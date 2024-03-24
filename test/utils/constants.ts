import { CreateRecordDto } from "src/record/dto/create-record.dto";
import { UpdatePasswordDto } from "src/record/dto/update-password.dto";
import { UpdateRecordDto } from "src/record/dto/update-record.dto";

export class TestDto {
    static readonly CREATE_RECORD_DTO: CreateRecordDto = {
        serviceName: "testServiceName",
        login: "testLogin"
    }

    static readonly UPDATE_FULL_RECORD_DTO: UpdateRecordDto = {
        serviceName: "testServiceNameUpdated",
        login: "testLoginUpdated",
        password: true
    }

    static readonly UPDATE_SERVICE_NAME_RECORD_DTO: UpdateRecordDto = {
        serviceName: "testServiceNameUpdated2",
    }

    static readonly UPDATE_LOGIN_RECORD_DTO: UpdateRecordDto = {
        login: "testLoginUpdated2",
    }

    static readonly NOT_UPDATE_PASSWORD_RECORD_DTO: UpdateRecordDto = {
        password: false,
    }

    static readonly UPDATE_PASSWORD_DTO: UpdatePasswordDto = {
        password: "testPasswordUpdated",
    }

    static readonly UPDATE_WITHOUT_PASSWORD_DTO: UpdatePasswordDto = {
        password: undefined,
    }
}; 