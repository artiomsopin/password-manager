import { Test, TestingModule } from "@nestjs/testing";
import { RecordService } from "../record.service";
import { getModelToken } from "@nestjs/mongoose";


describe('RecordService', () => {
    let service: RecordService;

    const recordRepositoryFactory = () => ({
        find: () => Promise.resolve([]),
    })


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecordService,
                { useFactory: recordRepositoryFactory, provide: getModelToken('RecordModel') }
            ],
        }).compile();

        service = module.get<RecordService>(RecordService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});